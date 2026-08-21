import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';

interface StationCardProps {
  stationName?: string;
  statusText?: string;
  levelValue?: string;
  unit?: string;
  trendText?: string;
  floodQuotaText?: string;
}

export const StationCard: React.FC<StationCardProps> = ({
  stationName = 'RIO GUAÍBA - CAIS MAUÁ',
  statusText = 'EM ALERTA',
  levelValue = '4,98',
  unit = 'm',
  trendText = '+0.05m nas últimas 2h',
  floodQuotaText = 'Cota de Inundação: 3,00m',
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* Station Name & Status Badge Row */}
      <View style={styles.headerRow}>
        <View style={styles.stationTitleContainer}>
          <Ionicons name="water-sharp" size={18} color={Colors.accentRed} />
          <Text style={Typography.callout}>{stationName}</Text>
        </View>

        <View style={styles.badgeContainer}>
          <View style={styles.badgeDot} />
          <Text style={Typography.badgeText}>{statusText}</Text>
        </View>
      </View>

      {/* Main Metric Value */}
      <View style={styles.metricRow}>
        <Text style={Typography.metricLarge}>{levelValue}</Text>
        <Text style={Typography.metricUnit}>{unit}</Text>
      </View>

      {/* Trend Info */}
      <View style={styles.trendRow}>
        <Feather name="trending-up" size={14} color={Colors.accentRed} />
        <Text style={Typography.trendText}>{trendText}</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Quota Footer */}
      <View style={styles.footerRow}>
        <Text style={Typography.callout}>{floodQuotaText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 36,
    padding: 24,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  stationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
    backgroundColor: Colors.badgeRedBackground,
    borderWidth: 1,
    borderColor: Colors.badgeRedBorder,
    borderRadius: 12,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accentRed,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 4,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderSubtle,
    marginVertical: 16,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
