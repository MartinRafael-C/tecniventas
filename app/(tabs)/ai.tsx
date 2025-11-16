import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { geminiService, Message } from '../../src/services/gemini';

export default function AIAssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! 👋 Soy tu asistente de compras. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await geminiService.sendMessage(
        userMessage.content,
        messages
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, hubo un error. Por favor intenta nuevamente.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.role === 'user';
    return (
      <View
        className={`mb-4 ${isUser ? 'items-end' : 'items-start'} px-4`}
      >
        <View
          className={`max-w-[80%] rounded-2xl p-4 ${
            isUser
              ? 'bg-blue-600'
              : 'bg-gray-200'
          }`}
        >
          <Text
            className={`text-base ${
              isUser ? 'text-white' : 'text-gray-800'
            }`}
          >
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View className="bg-blue-600 pt-12 pb-4">
        <Text className="text-white text-3xl font-bold px-4">
          ⭐ Asistente IA
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 16 }}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      {loading && (
        <View className="px-4 py-2">
          <ActivityIndicator size="small" color="#2563EB" />
        </View>
      )}

      <View className="flex-row items-center px-4 py-3 bg-white border-t border-gray-200">
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-3 mr-2"
          value={inputText}
          onChangeText={setInputText}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor="#9CA3AF"
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          disabled={loading || !inputText.trim()}
          className={`rounded-full p-3 ${
            loading || !inputText.trim() ? 'bg-gray-300' : 'bg-blue-600'
          }`}
        >
          <Text className="text-xl">📤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}