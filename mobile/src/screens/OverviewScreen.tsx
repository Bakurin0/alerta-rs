import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { Header } from '../components/Header';
import { StationCard } from '../components/StationCard';
import { AlertBanner } from '../components/AlertBanner';
import { BottomTabBar } from '../components/BottomTabBar';

export const OverviewScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Visão Geral */}
          <Header />

          {/* Card Estação Rio Guaíba */}
          <StationCard />

          {/* Banner de Alertas Ativos */}
          <AlertBanner />
        </ScrollView>

        {/* Menu Flutuante Inferior */}
        <BottomTabBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
});
