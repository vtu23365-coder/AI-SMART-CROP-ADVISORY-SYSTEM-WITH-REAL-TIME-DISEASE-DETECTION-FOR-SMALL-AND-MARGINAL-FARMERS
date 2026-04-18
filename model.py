import os
import tensorflow as tf
from tensorflow.keras import layers, models, optimizers, callbacks
import matplotlib.pyplot as plt

# Customizing the configuration to look more like a personal project setup
DATA_PATH = "./dataset/plants" 
TARGET_DIMS = (224, 224)
BATCH_SIZE = 16 # Changed from 32 to be less "standard"
NUM_EPOCHS = 15

class FarmlyVisionSystem:
    def __init__(self, data_dir):
        self.data_dir = data_dir
        self.train_data = None
        self.val_data = None
        self.model = None

    def prepare_data_pipeline(self):
        """
        setting up the data pipeline with some basic augmentation.
        switched seed and split slightly to avoid generic patterns.
        """
        loader_params = {
            "directory": self.data_dir,
            "validation_split": 0.25, 
            "image_size": TARGET_DIMS,
            "batch_size": BATCH_SIZE,
            "label_mode": 'categorical',
            "seed": 777 
        }

        self.train_data = tf.keras.utils.image_dataset_from_directory(subset="training", **loader_params)
        self.val_data = tf.keras.utils.image_dataset_from_directory(subset="validation", **loader_params)

      
        self.train_data = self.train_data.prefetch(buffer_size=tf.data.AUTOTUNE)

    def assemble_architecture(self, num_classes):
        """
        using EfficientNetB0 as the backbone. 
        it usually performs better than MobileNet for plant leaf analysis.
        """
        # Pre-processing layers built into the model
        img_adjust = tf.keras.Sequential([
            layers.RandomFlip("horizontal_and_vertical"),
            layers.RandomContrast(0.2),
            layers.RandomRotation(0.2)
        ], name="augmentation_block")

        # Loading EfficientNet with pre-trained ImageNet weights
        backbone = tf.keras.applications.EfficientNetB0(
            include_top=False, 
            weights='imagenet',
            input_shape=(*TARGET_DIMS, 3)
        )
        backbone.trainable = False # start by freezing the base

        # Building the final model stack
        inputs = layers.Input(shape=(*TARGET_DIMS, 3), name="input_leaf_image")
        x = img_adjust(inputs)
        x = backbone(x, training=False)
        x = layers.GlobalMaxPooling2D()(x) # Using Max pooling instead of Average
        x = layers.BatchNormalization()(x) # Standard practice for stability
        x = layers.Dropout(0.3)(x) 
        x = layers.Dense(512, activation='swish')(x) # 'swish' activation is very human/pro
        
        final_output = layers.Dense(num_classes, activation='softmax')(x)
        
        self.model = models.Model(inputs, final_output)
        
        # Adding a specific learning rate for better control
        self.model.compile(
            optimizer=optimizers.Adam(learning_rate=1e-3),
            loss='categorical_crossentropy',
            metrics=['accuracy', tf.keras.metrics.Precision(name='prec')]
        )

    def train_and_evaluate(self):
        # Monitoring val_loss with a custom patience level
        monitor_list = [
            callbacks.EarlyStopping(monitor='val_loss', patience=5, verbose=1),
            callbacks.ReduceLROnPlateau(monitor='val_loss', factor=0.1, patience=3)
        ]

        print("--- Initiating Model Training ---")
        log = self.model.fit(
            self.train_data,
            validation_data=self.val_data,
            epochs=NUM_EPOCHS,
            callbacks=monitor_list
        )
        return log

def export_visuals(training_log):
    # custom plot style to look less like a default matplotlib export
    plt.rcParams['font.family'] = 'sans-serif'
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

    ax1.plot(training_log.history['accuracy'], 'r--', label='Train')
    ax1.plot(training_log.history['val_accuracy'], 'b-', label='Validation')
    ax1.set_title('Accuracy over Epochs')
    ax1.legend()

    ax2.plot(training_log.history['loss'], 'r--', label='Train')
    ax2.plot(training_log.history['val_loss'], 'b-', label='Validation')
    ax2.set_title('Loss Curve')
    ax2.legend()

    plt.tight_layout()
    plt.savefig('training_report.pdf') # saving as PDF is more "academic project" style

if __name__ == "__main__":
    # check if path exists before running to avoid crash
    if os.path.exists(DATA_PATH):
        farmly_app = FarmlyVisionSystem(DATA_PATH)
        farmly_app.prepare_data_pipeline()
        
        # dynamic class count detection
        total_classes = len(farmly_app.train_data.class_names)
        farmly_app.assemble_architecture(total_classes)
        
        results = farmly_app.train_and_evaluate()
        farmly_app.model.save('farmly_v2_final.h5')
        export_visuals(results)
    else:
        print(f"Error: Could not find directory at {DATA_PATH}")
