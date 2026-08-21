import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

interface BottomTabBarProps {
  onTabChange?: (tabIndex: number) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleSelectTab = (index: number) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <View style={styles.floatingContainer}>
      {/* Tab 0 - Home / Visão Geral (Active) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleSelectTab(0)}
        style={[styles.tabButton, activeTab === 0 && styles.activePill]}
      >
        <Ionicons
          name="home"
          size={24}
          color={activeTab === 0 ? Colors.accentRed : Colors.textMuted}
        />
      </TouchableOpacity>

      {/* Tab 1 - Mapa */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleSelectTab(1)}
        style={[styles.tabButton, activeTab === 1 && styles.activePill]}
      >
        <Feather
          name="map-pin"
          size={24}
          color={activeTab === 1 ? Colors.accentRed : Colors.textMuted}
        />
      </TouchableOpacity>

      {/* Tab 2 - Gráficos / Histórico */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleSelectTab(2)}
        style={[styles.tabButton, activeTab === 2 && styles.activePill]}
      >
        <Feather
          name="bar-chart-2"
          size={24}
          color={activeTab === 2 ? Colors.accentRed : Colors.textMuted}
        />
      </TouchableOpacity>

      {/* Tab 3 - Notificações (com Badge) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleSelectTab(3)}
        style={[styles.tabButton, activeTab === 3 && styles.activePill]}
      >
        <View style={styles.iconBadgeWrapper}>
          <Feather
            name="bell"
            size={24}
            color={activeTab === 3 ? Colors.accentRed : Colors.textMuted}
          />
          {/* Badge Indicator */}
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    height: 72,
    backgroundColor: Colors.tabBarBackground,
    borderRadius: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  tabButton: {
    width: 64,
    height: 52,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activePill: {
    backgroundColor: Colors.activePillBackground,
  },
  iconBadgeWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -10,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.activePillBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.textWhite,
    fontSize: 11,
    fontWeight: '700',
  },
});
