import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Typography } from '../theme/typography';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Visão Geral',
  subtitle = 'Monitoramento em Tempo Real',
}) => {
  return (
    <View style={styles.container}>
      <Text style={Typography.largeTitle}>{title}</Text>
      <Text style={Typography.title2}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
    marginBottom: 20,
  },
});
