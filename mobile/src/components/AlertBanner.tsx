import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';

interface AlertBannerProps {
  alertCount?: number;
  categoryTitle?: string;
  message?: string;
  onPressDetails?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  alertCount = 12,
  categoryTitle = 'AVISO METEOROLÓGICO',
  message = 'Chuvas intensas previstas para a região metropolitana e vale do Taquari nas próximas 24h.',
  onPressDetails,
}) => {
  return (
    <View style={styles.container}>
      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={Typography.title1}>ALERTAS ATIVOS</Text>
        <Text style={Typography.largeTitleBold}>{alertCount}</Text>
      </View>

      {/* Alert Card */}
      <View style={styles.alertCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="warning-outline" size={18} color={Colors.textMuted} />
          <Text style={Typography.alertCategoryHeader}>{categoryTitle}</Text>
        </View>

        <Text style={styles.messageText}>{message}</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressDetails}
          style={styles.detailsButton}
        >
          <Text style={Typography.bodyAction}>Ver detalhes</Text>
          <Feather name="chevron-right" size={18} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 100, // Margin to allow space for bottom floating tab bar
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  alertCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 36,
    padding: 24,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  messageText: {
    ...Typography.body,
    lineHeight: 24,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
});
