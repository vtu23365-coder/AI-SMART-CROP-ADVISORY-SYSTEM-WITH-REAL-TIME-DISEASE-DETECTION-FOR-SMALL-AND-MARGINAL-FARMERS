import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={require('../assets/farmly_logo.png')} style={styles.profilePic} />
          <Text style={styles.greeting}>Hi, Kishore!</Text>
          <Image source={require('../assets/calendar_notification.png')} style={styles.calendarIcon} />
        </View>

        <View style={styles.weatherContainer}>
          <View style={styles.weatherCard}>
            <Image source={require('../assets/weather_sun_cloud.png')} style={styles.weatherIcon} />
            <View>
              <Text style={styles.weatherTitle}>Clear</Text>
              <Text style={styles.weatherSub}>Sunny day</Text>
              <Text style={styles.weatherAlert}>Watch for sunburn ☀️</Text>
            </View>
          </View>
          
          <View style={styles.tempCard}>
            <Image source={require('../assets/temp_icon.png')} style={styles.tempIcon} />
            <Text style={styles.tempText}>30°</Text>
            <Text style={styles.tempLabel}>Temperature</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Timely Care</Text>

        <View style={styles.careList}>
          <CareItem
            image={require('../assets/monstera_plant.png')}
            name="MONSTERA"
            issue="Your Monstera is consistently thirsty!"
            alert={true}
          />
          <CareItem
            image={require('../assets/zz_plant.png')}
            name="ZAMIOCULCAS"
            issue="Your Zamioculcas is consistently thirsty!"
            alert={true}
          />
          <CareItem
            image={require('../assets/monstera_plant_2.png')}
            name="MONSTERA"
            issue="Your Monstera is consistently thirsty!"
            alert={false}
          />
          <CareItem
            image={require('../assets/aloe_plant.png')}
            name="ALOE VERA"
            issue="Your Aloe Vera is consistently thirsty!"
            alert={false}
          />
          <CareItem
            image={require('../assets/crassula_plant.png')}
            name="CRASSULA"
            issue="Your Crassula is consistently thirsty!"
            alert={false}
          />
        </View>
        
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

function CareItem({ image, name, issue, alert }) {
  return (
    <View style={styles.careItem}>
      <View style={styles.careItemLeft}>
        <Image source={image} style={styles.careImage} />
        {alert && <Image source={require('../assets/alert_circle.png')} style={styles.alertBadge} />}
      </View>
      <View style={styles.careTextContainer}>
        <Text style={styles.careName}>{name}</Text>
        <Text style={styles.careIssue}>{issue}</Text>
      </View>
      <Image source={require('../assets/info_circle.png')} style={styles.infoIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 15,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
  },
  calendarIcon: {
    width: 35,
    height: 35,
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  weatherCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  weatherIcon: {
    width: 45,
    height: 45,
    marginRight: 12,
  },
  weatherTitle: {
    color: '#ff6b6b',
    fontWeight: '700',
    fontSize: 16,
  },
  weatherSub: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  weatherAlert: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  tempCard: {
    width: 130,
    backgroundColor: '#d4ed7b',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempIcon: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },
  tempText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
  },
  tempLabel: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  careList: {
    gap: 12,
  },
  careItem: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  careItemLeft: {
    position: 'relative',
    marginRight: 15,
  },
  careImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  alertBadge: {
    position: 'absolute',
    top: -5,
    left: -5,
    width: 20,
    height: 20,
  },
  careTextContainer: {
    flex: 1,
  },
  careName: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  careIssue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 4,
    lineHeight: 20,
  },
  infoIcon: {
    width: 24,
    height: 24,
    tintColor: '#ccc',
  },
  bottomPadding: {
    height: 100,
  }
});