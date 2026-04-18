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
Farmly-AI/
│
├── backend/
│   ├── app.py                 # FastAPI server and endpoint logic
│   ├── model.py               # ML model loading and prediction logic
│   ├── crop_disease_model.h5  # Pre-trained TensorFlow model
│   └── requirements.txt       # Python dependencies
│
└── frontend/ (Expo App)
    ├── App.js                 # Main React Native UI and logic
    ├── imageUploader.js       # Dedicated component for image handling
    ├── app.json               # Expo configuration
    ├── package.json           # Node dependencies
    └── assets/                # Contains logo, icons, animations, flags, etc.
