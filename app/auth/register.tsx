import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '../../src/utils/validation';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    // Simulación de registro (sin guardar datos)
    Alert.alert('¡Éxito!', 'Cuenta creada exitosamente', [
      { text: 'OK', onPress: () => router.replace('/(tabs)/home') },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-blue-50">
      <View className="justify-center px-6 py-12">
        <Text className="text-4xl font-bold text-blue-600 mb-8 text-center">
          Crear Cuenta
        </Text>

        <View className="bg-white rounded-2xl p-6 shadow-lg">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="text-gray-700 mb-2 font-semibold">
                  Nombre
                </Text>
                <TextInput
                  className="bg-gray-100 rounded-xl px-4 py-3"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Tu nombre completo"
                />
                {errors.name && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </Text>
                )}
              </View>
            )}
          />

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
              <View className="mb-4">
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

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <View className="mb-6">
                <Text className="text-gray-700 mb-2 font-semibold">
                  Confirmar Contraseña
                </Text>
                <TextInput
                  className="bg-gray-100 rounded-xl px-4 py-3"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
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
              Registrarse
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4"
          >
            <Text className="text-blue-600 text-center">
              ¿Ya tienes cuenta? Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}