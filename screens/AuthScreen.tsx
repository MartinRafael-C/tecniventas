// screens/AuthScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { validateLogin, validateRegister } from '../schemas/validationSchemas';
import ScreenContainer from '../components/ScreenContainer';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface AuthScreenProps {
  onLogin: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = () => {
    const validationErrors = isLogin 
      ? validateLogin(formData) 
      : validateRegister(formData);
    
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onLogin();
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Card style={styles.card}>
          <Text style={styles.title}>
            {isLogin ? '🛍️ Iniciar Sesión' : '📝 Registro'}
          </Text>
          
          {!isLogin && (
            <Input
              label="Nombre"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              error={errors.name}
              placeholder="Tu nombre"
            />
          )}
          
          <Input
            label="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            error={errors.email}
            placeholder="tu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Input
            label="Contraseña"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            error={errors.password}
            placeholder="••••••••"
            secureTextEntry
          />
          
          {!isLogin && (
            <Input
              label="Confirmar Contraseña"
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              error={errors.confirmPassword}
              placeholder="••••••••"
              secureTextEntry
            />
          )}
          
          <Button onPress={handleSubmit} style={styles.button}>
            {isLogin ? 'Ingresar' : 'Registrarse'}
          </Button>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
              }}
            >
              <Text style={styles.switchLink}>
                {isLogin ? ' Regístrate' : ' Inicia Sesión'}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    width: '100%',
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
  },
  button: {
    width: '100%',
    marginTop: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  switchText: {
    color: '#6b7280',
  },
  switchLink: {
    color: '#667eea',
    fontWeight: '600',
  },
});

export default AuthScreen;