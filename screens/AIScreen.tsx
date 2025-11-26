// screens/AIScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import Button from '../components/Button';

const AIScreen: React.FC = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy tu asistente de compras con IA. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ 
            role: 'user', 
            content: `Eres un asistente de ventas experto. Ayuda al usuario con su consulta sobre productos: ${input}` 
          }],
        }),
      });

      const data = await response.json();
      const aiResponse = data.content?.find((c: any) => c.type === 'text')?.text || 
                        'Lo siento, no pude procesar tu solicitud.';
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Lo siento, hubo un error. Por favor intenta de nuevo.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <Ionicons name="sparkles" size={28} color={theme.primary} />
        <Text style={[styles.title, { color: theme.text }]}>Asistente IA</Text>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg, idx) => (
          <View
            key={idx}
            style={[
              styles.messageBubble,
              msg.role === 'user' ? styles.userBubble : [styles.assistantBubble, { backgroundColor: theme.card }]
            ]}
          >
            <Text style={[
              styles.messageText,
              msg.role === 'user' ? styles.userText : { color: theme.text }
            ]}>
              {msg.content}
            </Text>
          </View>
        ))}
        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
              Escribiendo...
            </Text>
          </View>
        )}
      </ScrollView>
      
      <View style={[styles.inputContainer, { 
        backgroundColor: theme.surface,
        borderTopColor: theme.border,
      }]}>
        <View style={[styles.inputWrapper, { 
          backgroundColor: theme.card,
          borderColor: theme.border,
        }]}>
          <TextInput
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            placeholder="Escribe tu mensaje..."
            style={[styles.input, { color: theme.text }]}
            placeholderTextColor={theme.textSecondary}
            multiline
            maxLength={500}
          />
          <Button 
            onPress={sendMessage} 
            disabled={loading || !input.trim()}
            style={styles.sendButton}
          >
            <Ionicons name="send" size={20} color="white" />
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#667eea',
  },
  assistantBubble: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: 'white',
  },
  loadingContainer: {
    alignSelf: 'flex-start',
    padding: 12,
  },
  loadingText: {
    fontStyle: 'italic',
  },
  inputContainer: {
    padding: 12,
    borderTopWidth: 1,
    paddingBottom: 100,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AIScreen;