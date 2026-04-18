from fastapi import FastAPI, UploadFile, File
import uvicorn
import numpy as np
from PIL import Image
import tensorflow as tf
import io

app = FastAPI(title="Smart Crop Advisory System API")

Load the trained model
try:
model = tf.keras.models.load_model('crop_disease_model.h5')
except:
print("Warning: Model not found. API will run, but predictions will fail.")
model = None

Class labels
CLASS_NAMES = ["Apple_Scab", "Apple_Healthy", "Tomato_Late_Blight", "Tomato_Healthy"]

Smart Advisory Database
ADVISORY_DB = {
"Apple_Scab": {
"severity": "High",
"action": "Apply organic fungicides containing copper or sulfur. Rake up and destroy fallen leaves to prevent fungal overwintering.",
"irrigation": "Avoid overhead watering to keep leaves dry."
},
"Tomato_Late_Blight": {
"severity": "Critical",
"action": "Remove and destroy infected plants immediately. Apply chlorothalonil-based fungicides to surrounding healthy plants.",
"irrigation": "Drip irrigation only. Ensure good airflow between plants."
},
"Healthy": {
"severity": "None",
"action": "Crop is healthy! Continue standard nutrient management.",
"irrigation": "Maintain regular watering schedule based on soil moisture."
}
}

def get_real_time_weather(location="Farm"):
return {"temp": "28°C", "humidity": "75%", "forecast": "Rain expected tomorrow"}

@app.post("/analyze_crop/")
async def analyze_crop(file: UploadFile = File(...)):
if not model:
return {"error": "AI Model not loaded."}

# 1. Read and process the image
contents = await file.read()
image = Image.open(io.BytesIO(contents)).resize((224, 224))
img_array = tf.keras.preprocessing.image.img_to_array(image)
img_array = tf.expand_dims(img_array, 0) / 255.0 

# 2. Make Prediction
predictions = model.predict(img_array)
predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
confidence = float(np.max(predictions[0]))

# 3. Determine Advisory Context
advisory_key = "Healthy" if "Healthy" in predicted_class else predicted_class
advisory_info = ADVISORY_DB.get(advisory_key, {"action": "Consult local agronomist."})

# 4. Fetch Weather Data
weather = get_real_time_weather()

return {
    "disease_detected": predicted_class,
    "confidence": round(confidence * 100, 2),
    "weather_context": weather,
    "advisory": advisory_info
}
if name == "main":
uvicorn.run(app, host="0.0.0.0", port=8000)
