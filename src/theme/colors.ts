// src/theme/colors.ts
export const LightColors = {
  primary: '#2E7D32',          // green
  secondary: '#FFB300',        // yellow/orange
  background: '#F5F5F5',       // neutral bg
  accent: '#0288D1',           // blue
  textPrimary: '#000000',
  textSecondary: '#757575',
  card: '#FFFFFF',
  border: '#E0E0E0',
  success: '#2E7D32',
  danger: '#D32F2F'
};

export const DarkColors = {
  primary: '#2E7D32',
  secondary: '#FFB300',
  background: '#212121',       // dark bg
  accent: '#0288D1',
  textPrimary: '#FFFFFF',
  textSecondary: '#BDBDBD',
  card: '#2C2C2C',
  border: '#424242',
  success: '#66BB6A',
  danger: '#EF5350'
};

export type ColorScheme = typeof LightColors;
