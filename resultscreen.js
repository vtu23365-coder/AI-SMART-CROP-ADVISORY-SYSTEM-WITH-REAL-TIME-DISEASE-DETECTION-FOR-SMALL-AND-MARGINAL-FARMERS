import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResultScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageHeader}>
        <Image 
          source={require('../assets/tomato_disease.jpeg')} 
          style={styles.mainImage} 
        />
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../assets/nav_back.png')} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentCard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionLabel}>Issues Detected</Text>
          
          <View style={styles.issueBox}>
            <View style={styles.issueHeader}>
              <Image source={require('../assets/alert_icon_red.png')} style={styles.alertIcon} />
              <View style={styles.issueTitleContainer}>
                <Text style={styles.issueTitle}>Blossom End Rot</Text>
                <View style={styles.highBadge}><Text style={styles.badgeText}>HIGH</Text></View>
              </View>
            </View>
            <Text style={styles.issueDescription}>
              Ensure consistent watering to maintain even soil moisture
            </Text>
          </View>

          <Text style={styles.sectionLabel}>Care Instructions</Text>

          <CareInstruction 
            icon={require('../assets/icon_watering.png')}
            title="Watering"
            desc="Water deeply and consistently at the base of the plant to keep soil evenly moist but not waterlogged."
          />
          <CareInstruction 
            icon={require('../assets/icon_sunlight.png')}
            title="Sunlight"
            desc="Needs at least 6 to 8 hours of full sun daily."
          />
          <CareInstruction 
            icon={require('../assets/icon_temp.png')}
            title="Temperature"
            desc="Thrives in temperatures between 70°F and 85°F (21°C - 29°C)."
          />
          <CareInstruction 
            icon={require('../assets/icon_soil.png')}
            title="Soil"
            desc="Prefers well-draining, nutrient-rich, slightly acidic soil with a pH between 6.0 and 6.8."
          />
          
          <View style={styles.bottomSpace} />
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Add to My Plants</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CareInstruction({ icon, title, desc }) {
  return (
    <View style={styles.instructionCard}>
      <View style={styles.iconCircle}>
        <Image source={icon} style={styles.instructionIcon} />
      </View>
      <View style={styles.instructionText}>
        <Text style={styles.instructionTitle}>{title}</Text>
        <Text style={styles.instructionDesc}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageHeader: {
    width: '100%',
    height: 350,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  issueBox: {
    backgroundColor: '#fff1f1',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ffdada',
    marginBottom: 25,
  },
  issueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  issueTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  issueTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e74c3c',
  },
  highBadge: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
  issueDescription: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    paddingLeft: 36,
  },
  instructionCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fcfcfc',
    padding: 15,
    borderRadius: 15,
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  instructionIcon: {
    width: 20,
    height: 20,
    tintColor: '#4A7055',
  },
  instructionText: {
    flex: 1,
    marginLeft: 15,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  instructionDesc: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    lineHeight: 18,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  primaryButton: {
    backgroundColor: '#4A7055',
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomSpace: {
    height: 40,
  }
});