import React, { useState, useCallback } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity,
  ActivityIndicator, ScrollView, Alert, SafeAreaView, Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
const ENDPOINT = "http://192.168.1.1:8000/analyze_crop/";
const COLORS = {
  primary: '#2E7D32', // Deep Organic Green
  secondary: '#8D6E63', // Earthy Brown
  background: '#F9FBF9',
  card: '#FFFFFF',
  textMain: '#1B5E20',
  textSub: '#546E7A'
};

export default function FieldGuardApp() {
  const [fileStack, setFileStack] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const [reportData, setReportData] = useState(null);

  // Helper: Request and Launch Media
  const initiateMediaCapture = async (sourceType) => {
    try {
      const isCamera = sourceType === 'camera';
      const permission = isCamera 
        ? await ImagePicker.requestCameraPermissionsAsync() 
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Access Denied", `We need ${isCamera ? 'camera' : 'gallery'} access to proceed.`);
        return;
      }

      const options = { allowsEditing: true, aspect: [1, 1], quality: 0.8 };
      const action = isCamera 
        ? await ImagePicker.launchCameraAsync(options) 
        : await ImagePicker.launchImageLibraryAsync(options);

      if (!action.canceled) {
        setFileStack(action.assets[0].uri);
        setReportData(null); // Clear previous results on new selection
      }
    } catch (err) {
      console.error("Selection Error:", err);
    }
  };

  // Service: Handle API Interaction
  const runDiagnostic = useCallback(async () => {
    if (!fileStack) return;

    setIsBusy(true);
    const body = new FormData();
    const uriParts = fileStack.split('.');
    const extension = uriParts[uriParts.length - 1];

    body.append('file', {
      uri: fileStack,
      name: `field_sample.${extension}`,
      type: `image/${extension}`,
    });

    try {
      const call = await fetch(ENDPOINT, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (!call.ok) throw new Error("Cloud sync failed");

      const json = await call.json();
      setReportData(json);
    } catch (e) {
      Alert.alert("Network Failure", "Unable to reach the diagnostic server.");
    } finally {
      setIsBusy(false);
    }
  }, [fileStack]);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.layout}>
        
        {/* Branding Header */}
        <View style={styles.brandContainer}>
          <Text style={styles.appLogo}>FieldGuard</Text>
          <Text style={styles.tagline}>Intelligent Plant Pathology System</Text>
        </View>

        {/* Media Preview Area */}
        <View style={styles.previewShell}>
          {fileStack ? (
            <Image source={{ uri: fileStack }} style={styles.activeImage} />
          ) : (
            <Text style={styles.emptyText}>Prepare a sample for analysis</Text>
          )}
        </View>

        {/* Control Interface */}
        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.ghostBtn} 
            onPress={() => initiateMediaCapture('camera')}
          >
            <Text style={styles.ghostBtnText}>Capture</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.ghostBtn} 
            onPress={() => initiateMediaCapture('gallery')}
          >
            <Text style={styles.ghostBtnText}>Browse</Text>
          </TouchableOpacity>
        </View>

        {fileStack && (
          <TouchableOpacity 
            style={[styles.mainAction, isBusy && { opacity: 0.6 }]} 
            onPress={runDiagnostic}
            disabled={isBusy}
          >
            {isBusy ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.mainActionText}>Run Full Scan</Text>
            )}
          </TouchableOpacity>
        )}

        {/* Result Output */}
        {reportData && (
          <View style={styles.outputCard}>
            <View style={styles.badgeRow}>
              <Text style={styles.statusLabel}>DETECTION</Text>
              <Text style={styles.confidenceScore}>{reportData.confidence}% Match</Text>
            </View>
            
            <Text style={styles.diseaseTitle}>
              {reportData.disease_detected?.split('_').join(' ')}
            </Text>

            <View style={styles.hr} />

            <View style={styles.metaRow}>
              <View style={styles.metaCol}>
                <Text style={styles.metaHeader}>Severity</Text>
                <Text style={styles.metaVal}>{reportData.advisory.severity}</Text>
              </View>
              <View style={styles.metaCol}>
                <Text style={styles.metaHeader}>Temp</Text>
                <Text style={styles.metaVal}>{reportData.weather_context.temp}</Text>
              </View>
            </View>

            <Text style={styles.adviceBody}>
              <Text style={{ fontWeight: 'bold' }}>Guidance: </Text>
              {reportData.advisory.action}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  layout: { padding: 25, paddingBottom: 60 },
  brandContainer: { marginVertical: 30 },
  appLogo: { fontSize: 34, fontWeight: '900', color: COLORS.primary, letterSpacing: -1 },
  tagline: { fontSize: 13, color: COLORS.textSub, marginTop: 2, textTransform: 'uppercase' },
  
  previewShell: {
    width: '100%', height: 320, backgroundColor: '#E8F5E9',
    borderRadius: 28, marginBottom: 25, justifyContent: 'center', 
    alignItems: 'center', borderStyle: 'solid', borderWidth: 1, borderColor: '#C8E6C9'
  },
  activeImage: { width: '100%', height: '100%', borderRadius: 28 },
  emptyText: { color: COLORS.primary, opacity: 0.5, fontWeight: '600' },

  controls: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  ghostBtn: {
    width: '47%', paddingVertical: 15, borderRadius: 16,
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EEE', alignItems: 'center'
  },
  ghostBtnText: { color: COLORS.secondary, fontWeight: '700' },

  mainAction: {
    backgroundColor: COLORS.primary, paddingVertical: 20, borderRadius: 16,
    alignItems: 'center', shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2, shadowRadius: 15, elevation: 6
  },
  mainActionText: { color: '#FFF', fontSize: 18, fontWeight: '800' },

  outputCard: {
    marginTop: 30, padding: 25, backgroundColor: COLORS.card,
    borderRadius: 30, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 20
  },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statusLabel: { fontSize: 10, fontWeight: '900', color: COLORS.textSub, letterSpacing: 1 },
  confidenceScore: { fontSize: 12, fontWeight: '700', color: '#43A047' },
  diseaseTitle: { fontSize: 24, fontWeight: '800', color: COLORS.textMain, marginBottom: 15 },
  hr: { height: 1, backgroundColor: '#F0F0F0', marginBottom: 15 },
  metaRow: { flexDirection: 'row', marginBottom: 15 },
  metaCol: { flex: 1 },
  metaHeader: { fontSize: 11, color: COLORS.textSub, marginBottom: 4 },
  metaVal: { fontSize: 15, fontWeight: '600', color: COLORS.textMain },
  adviceBody: { fontSize: 14, color: '#455A64', lineHeight: 22 }
});
