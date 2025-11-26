// screens/SettingsScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';

interface SettingsScreenProps {
  onLogout: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onLogout }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="settings" size={48} color={theme.primary} />
          <Text style={[styles.title, { color: theme.text }]}>Configuración</Text>
        </View>

        {/* Sección de Apariencia */}
        <Card style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Apariencia</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons 
                name={isDark ? "moon" : "sunny"} 
                size={24} 
                color={theme.primary} 
              />
              <Text style={[styles.settingText, { color: theme.text }]}>
                Modo Oscuro
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#d1d5db', true: theme.primary }}
              thumbColor={isDark ? '#f3f4f6' : '#ffffff'}
            />
          </View>
        </Card>

        {/* Sección de Cuenta */}
        <Card style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Cuenta</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="person-circle-outline" size={24} color={theme.primary} />
              <Text style={[styles.settingText, { color: theme.text }]}>
                Perfil
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={24} color={theme.primary} />
              <Text style={[styles.settingText, { color: theme.text }]}>
                Notificaciones
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </Card>

        {/* Sección de Información */}
        <Card style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Información</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle-outline" size={24} color={theme.primary} />
              <Text style={[styles.settingText, { color: theme.text }]}>
                Ayuda y Soporte
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="information-circle-outline" size={24} color={theme.primary} />
              <Text style={[styles.settingText, { color: theme.text }]}>
                Acerca de
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </Card>

        {/* Botón de Cerrar Sesión */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: theme.error }]}
            onPress={onLogout}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
          >
            <Ionicons name="log-out-outline" size={24} color="#ffffff" />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={[styles.version, { color: theme.textSecondary }]}>
          Versión 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 12,
  },
  section: {
    marginBottom: 20,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
  },
});

export default SettingsScreen;