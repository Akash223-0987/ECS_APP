// src/components/Section.tsx
import React, { PropsWithChildren } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ColorScheme } from '../theme/colors';

type Props = PropsWithChildren<{
  title?: string;
  colors: ColorScheme;
}>;

const Section: React.FC<Props> = ({ title, colors, children }) => {
  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {!!title && <Text accessibilityRole="header" style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8
  }
});

export default Section;
