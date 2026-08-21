import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const Typography = StyleSheet.create({
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '400',
    color: Colors.textPrimary,
    letterSpacing: 0.4,
  },
  largeTitleBold: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.4,
  },
  title1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '400',
    color: Colors.textMuted,
    letterSpacing: 0.38,
  },
  title2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400',
    color: Colors.textSecondary,
    letterSpacing: -0.26,
  },
  body: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
    color: Colors.textMuted,
    letterSpacing: -0.43,
  },
  bodyAction: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
    color: Colors.textSecondary,
    letterSpacing: -0.43,
  },
  callout: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
    color: Colors.textMuted,
    letterSpacing: -0.31,
  },
  metricLarge: {
    fontSize: 48,
    lineHeight: 53,
    fontWeight: '700',
    color: Colors.accentRed,
    letterSpacing: -0.96,
  },
  metricUnit: {
    fontSize: 18,
    lineHeight: 29,
    fontWeight: '400',
    color: Colors.textMuted,
  },
  trendText: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '500',
    color: Colors.accentRed,
    letterSpacing: 0.14,
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '600',
    color: Colors.accentRed,
    letterSpacing: 0.6,
  },
  alertCategoryHeader: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '500',
    color: Colors.textMuted,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
});
