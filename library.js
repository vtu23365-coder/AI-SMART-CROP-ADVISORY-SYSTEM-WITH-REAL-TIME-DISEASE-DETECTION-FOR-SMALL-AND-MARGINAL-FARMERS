import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MY_PLANTS = [
  { id: '1', name: 'Monstera', location: 'Living room, sofa', image: require('../assets/monstera_thumb.png'), alert: true },
  { id: '2', name: 'Zamioculcas', location: 'Living room, wall', image: require('../assets/zz_thumb.png'), alert: true },
  { id: '3', name: 'Monstera', location: "Valera's room", image: require('../assets/monstera_thumb_2.png'), alert: true },
  { id: '4', name: 'Aloe Vera', location: 'Living room, shelf', image: require('../assets/aloe_thumb.png'), alert: true },
  { id: '5', name: 'Crassula', location: 'Office, desk', image: require('../assets/crassula_thumb.png'), alert: true },
  { id: '6', name: 'Philodendron', location: 'Bedroom, corner', image: require('../assets/philo_thumb.png'), alert: true },
];

export default function CropLibrary() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.cardImage} />
        {item.alert && (
          <View style={styles.cardAlertBadge}>
            <Image source={require('../assets/alert_icon_red.png')} style={styles.cardAlertIcon} />
          </View>
        )}
      </View>
      <View style={styles.cardInfo}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Image source={require('../assets/calendar_mini.png')} style={styles.miniIcon} />
        </View>
        <Text style={styles.cardLocation}>{item.location}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Plants</Text>
        <Text style={styles.headerSub}>Pull Down</Text>
      </View>

      <Text style={styles.sectionHeader}>Needs Attention</Text>

      <FlatList
        data={MY_PLANTS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab}>
        <Image source={require('../assets/fab_leaf_icon.png')} style={styles.fabIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  headerSub: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 6,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  imageContainer: {
    height: 160,
    width: '100%',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardAlertBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#fff',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardAlertIcon: {
    width: 14,
    height: 14,
  },
  cardInfo: {
    padding: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  miniIcon: {
    width: 18,
    height: 18,
    tintColor: '#4A7055',
  },
  cardLocation: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    backgroundColor: '#4A7055',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A7055',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  fabIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  }
});