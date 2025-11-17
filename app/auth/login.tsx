import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../../src/utils/validation';
import { router } from 'expo-router';

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    // Simulación de login (sin guardar datos)
    Alert.alert('¡Éxito!', 'Inicio de sesión exitoso');
    router.replace('/(tabs)/home');
  };

  return (
    <View className="flex-1 bg-blue-50 justify-center px-6">
      <Text className="text-4xl font-bold text-blue-600 mb-8 text-center">
        Iniciar Sesión
      </Text>

      <View className="bg-white rounded-2xl p-6 shadow-lg">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-semibold">Email</Text>
              <TextInput
                className="bg-gray-100 rounded-xl px-4 py-3"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="correo@ejemplo.com"
              />
              {errors.email && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View className="mb-6">
              <Text className="text-gray-700 mb-2 font-semibold">
                Contraseña
              </Text>
              <TextInput
                className="bg-gray-100 rounded-xl px-4 py-3"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                placeholder="••••••••"
              />
              {errors.password && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </Text>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-blue-600 rounded-xl py-4"
        >
          <Text className="text-white text-center font-bold text-lg">
            Ingresar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/auth/register')}
          className="mt-4"
        >
          <Text className="text-blue-600 text-center">
            ¿No tienes cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}