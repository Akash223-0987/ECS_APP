// App.tsx
// App.tsx
// import "expo-router/entry";

import 'react-native-gesture-handler';
import React, { createContext, useMemo, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, Theme as NavTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import ControlScreen from './src/screens/ControlScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import { DarkColors, LightColors, ColorScheme } from 'src/theme/colors';

type ThemeContextType = {
  dark: boolean;
  colors: ColorScheme;
  toggleDark: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  colors: LightColors,
  toggleDark: () => {}
});

export type RootTabParamList = {
  Home: undefined;
  Control: undefined;
  Analytics: undefined;
  Settings: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  const [dark, setDark] = useState(false);

  const ctxValue = useMemo<ThemeContextType>(() => ({
    dark,
    colors: dark ? DarkColors : LightColors,
    toggleDark: () => setDark((d) => !d)
  }), [dark]);

  const navTheme: NavTheme = {
    ...(dark ? DarkTheme : DefaultTheme),
    colors: {
      ...(dark ? DarkTheme.colors : DefaultTheme.colors),
      background: ctxValue.colors.background,
      card: ctxValue.colors.card,
      text: ctxValue.colors.textPrimary,
      border: ctxValue.colors.border,
      primary: ctxValue.colors.primary
    }
  };

  return (
    <ThemeContext.Provider value={ctxValue}>
      <NavigationContainer theme={navTheme}>
        <StatusBar style={dark ? 'light' : 'dark'} />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: ctxValue.colors.primary,
            tabBarInactiveTintColor: ctxValue.colors.textSecondary,
            tabBarStyle: { backgroundColor: ctxValue.colors.card, borderTopColor: ctxValue.colors.border },
            tabBarIcon: ({ color, size }) => {
              let icon = 'home';
              if (route.name === 'Home') icon = 'home';
              if (route.name === 'Control') icon = 'toggle';
              if (route.name === 'Analytics') icon = 'bar-chart';
              if (route.name === 'Settings') icon = 'settings';
              if (route.name === 'Profile') icon = 'person';
              return <Ionicons name={icon as any} size={size} color={color} accessibilityLabel={`${route.name} tab`} />;
            }
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Control" component={ControlScreen} />
          <Tab.Screen name="Analytics" component={AnalyticsScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
