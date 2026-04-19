# 🌿 Farmly AI - Crop Disease Diagnosis App

**Farmly AI** is an intelligent mobile application built with React Native (Expo) and FastAPI. It helps farmers and agriculturalists instantly diagnose crop diseases by uploading or capturing a photo of a plant leaf. The app provides real-time AI-powered analysis, confidence scores, and actionable treatment advisories.

## ✨ Features
- 📸 **Camera & Gallery Integration:** Seamlessly snap a photo or upload an existing image of a crop.
- 🧠 **AI-Powered Diagnostics:** Utilizes a TensorFlow deep learning model to accurately identify plant diseases (e.g., Apple Scab, Tomato Late Blight).
- 🩺 **Smart Treatment Advisory:** Provides actionable guidance, severity levels, and irrigation tips based on the diagnosis.
- 🌤️ **Environmental Context:** Integrates local weather data to provide holistic farming advice.
- 🚀 **Cross-Platform:** Built with Expo, running smoothly on both Android and iOS devices.

## 🛠️ Tech Stack
- **Frontend:** React Native, Expo, `expo-image-picker`
- **Backend:** Python, FastAPI, Uvicorn
- **Machine Learning:** TensorFlow, Keras, NumPy, Pillow

## 📂 Project Structure


```text
FARMLY/
├── app/                        # React Native / Expo Frontend
│   ├── App.js                  # Main navigation container
│   ├── assets/                 # UI assets, icons, and placeholder images
│   ├── api/                    # API integration logic (aiService.js)
│   └── screens/
│       ├── Dashboard.js        # Weather and timely care alerts
│       ├── CropLibrary.js      # Plant collection grid
│       ├── ResultScreen.js     # AI diagnostic output and care instructions
│       ├── HistoryScreen.js    # Care action timeline
│       └── ProfileScreen.js    # User settings and multilingual support
│
└── ai_engine/                  # PyTorch Machine Learning Pipeline
    ├── train.py                # MobileNetV2 training script
    ├── dataset/                # Training and validation image data
    ├── farmly_disease_model.pth# Generated model weights
    └── class_names.txt         # Auto-generated class mappingsendencies
    └── assets/                # Contains logo, icons, animations, flags, etc.
