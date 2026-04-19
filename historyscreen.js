import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Care History</Text>

        <View style={styles.historyList}>
          <HistoryItem
            image={require('../assets/monstera_thumb.png')}
            plantName="Monstera"
            actionTitle="Watered"
            actionDesc="Regular watering"
            timeAgo="2 weeks ago"
            icon={require('../assets/icon_water_drop.png')}
            iconColor="#4A7055"
          />
          <HistoryItem
            image={require('../assets/zz_thumb.png')}
            plantName="Zamioculcas"
            actionTitle="Watered"
            actionDesc=""
            timeAgo="3 weeks ago"
            icon={require('../assets/icon_water_drop.png')}
            iconColor="#4A7055"
          />
          <HistoryItem
            image={require('../assets/monstera_thumb_2.png')}
            plantName="Monstera"
            actionTitle="Fertilized"
            actionDesc="Added liquid fertilizer"
            timeAgo="1 months ago"
            icon={require('../assets/icon_fertilize.png')}
            iconColor="#8BC34A"
          />
          <HistoryItem
            image={require('../assets/monstera_thumb_2.png')}
            plantName="Monstera"
            actionTitle="Pruned"
            actionDesc="Removed dead leaves"
            timeAgo="1 months ago"
            icon={require('../assets/icon_prune.png')}
            iconColor="#FF9800"
          />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

function HistoryItem({ image, plantName, actionTitle, actionDesc, timeAgo, icon, iconColor }) {
  return (
    <View style={styles.historyCard}>
      <Image source={image} style={styles.plantImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.plantName}>{plantName}</Text>
        <View style={styles.actionRow}>
          <Image source={icon} style={[styles.actionIcon, { tintColor: iconColor }]} />
          <Text style={[styles.actionTitle, { color: iconColor }]}>{actionTitle}</Text>
        </View>
        {actionDesc ? <Text style={styles.actionDesc}>{actionDesc}</Text> : null}
      </View>
      <Text style={styles.timeText}>{timeAgo}</Text>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 10,
    marginBottom: 25,
  },
  historyList: {
    gap: 15,
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  plantImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  plantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  actionIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionDesc: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 100,
  }
});