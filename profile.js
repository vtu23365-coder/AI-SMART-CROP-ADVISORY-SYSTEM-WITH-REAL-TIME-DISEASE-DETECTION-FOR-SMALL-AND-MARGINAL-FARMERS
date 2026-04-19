import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={require('../assets/profile_avatar.png')} style={styles.avatarImage} />
          </View>
          <Text style={styles.userName}>Kishore</Text>
          <Text style={styles.userEmail}>me@gmail.com</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>14</Text>
            <Text style={styles.statLabel}>Plants</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>836</Text>
            <Text style={styles.statLabel}>Days Active</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>14</Text>
            <Text style={styles.statLabel}>Watered</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <MenuItem icon={require('../assets/icon_user_edit.png')} title="Edit Profile" />
          <MenuItem 
            icon={require('../assets/icon_globe.png')} 
            title="Language" 
            onPress={() => setLangModalVisible(true)}
          />
          <MenuItem icon={require('../assets/icon_bell.png')} title="Notifications" />
          <MenuItem icon={require('../assets/icon_palette.png')} title="Appearance" />
          <MenuItem icon={require('../assets/icon_help.png')} title="Help & Support" />
          <MenuItem icon={require('../assets/icon_shield.png')} title="Privacy Policy" />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={langModalVisible}
        onRequestClose={() => setLangModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Choose Language</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <LangOption title="English" selected={currentLang === 'English'} onSelect={() => { setCurrentLang('English'); setLangModalVisible(false); }} />
              <LangOption title="Bahasa Indonesia" selected={currentLang === 'Bahasa Indonesia'} onSelect={() => { setCurrentLang('Bahasa Indonesia'); setLangModalVisible(false); }} />
              <LangOption title="Español" selected={currentLang === 'Español'} onSelect={() => { setCurrentLang('Español'); setLangModalVisible(false); }} />
              <LangOption title="Français" selected={currentLang === 'Français'} onSelect={() => { setCurrentLang('Français'); setLangModalVisible(false); }} />
              <LangOption title="العربية" selected={currentLang === 'العربية'} onSelect={() => { setCurrentLang('العربية'); setLangModalVisible(false); }} />
              <LangOption title="हिन्दी" selected={currentLang === 'हिन्दी'} onSelect={() => { setCurrentLang('हिन्दी'); setLangModalVisible(false); }} />
              <LangOption title="தமிழ்" selected={currentLang === 'தமிழ்'} onSelect={() => { setCurrentLang('தமிழ்'); setLangModalVisible(false); }} />
              <LangOption title="తెలుగు" selected={currentLang === 'తెలుగు'} onSelect={() => { setCurrentLang('తెలుగు'); setLangModalVisible(false); }} />
              <LangOption title="മലയാളം" selected={currentLang === 'മലയാളം'} onSelect={() => { setCurrentLang('മലയാളം'); setLangModalVisible(false); }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function MenuItem({ icon, title, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconContainer}>
        <Image source={icon} style={styles.menuIcon} />
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
      <Image source={require('../assets/icon_chevron_right.png')} style={styles.chevronIcon} />
    </TouchableOpacity>
  );
}

function LangOption({ title, selected, onSelect }) {
  return (
    <TouchableOpacity style={styles.langOption} onPress={onSelect}>
      <Text style={styles.langText}>{title}</Text>
      {selected && <Text style={styles.checkMark}>✓</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6A9073',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarImage: {
    width: 50,
    height: 50,
    tintColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A7055',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    fontWeight: '500',
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#f5f7f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIcon: {
    width: 18,
    height: 18,
    tintColor: '#4A7055',
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  chevronIcon: {
    width: 16,
    height: 16,
    tintColor: '#ccc',
  },
  bottomPadding: {
    height: 100,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 20,
  },
  langOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  langText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  checkMark: {
    fontSize: 16,
    color: '#4A7055',
    fontWeight: '700',
  }
});