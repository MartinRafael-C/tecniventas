// screens/AIScreen.jsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import Button from '../components/Button';

const AIScreen = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy tu asistente de compras con IA. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);

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
      const aiResponse = data.content?.find(c => c.type === 'text')?.text || 
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
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.header}>
        <Text style={styles.title}>⭐ Asistente IA</Text>
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
              msg.role === 'user' ? styles.userBubble : styles.assistantBubble
            ]}
          >
            <Text style={[
              styles.messageText,
              msg.role === 'user' && styles.userText
            ]}>
              {msg.content}
            </Text>
          </View>
        ))}
        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Escribiendo...</Text>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          placeholder="Escribe tu mensaje..."
          style={styles.input}
          placeholderTextColor="#9ca3af"
          multiline
        />
        <Button 
          onPress={sendMessage} 
          disabled={loading || !input.trim()}
          style={styles.sendButton}
        >
          Enviar
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
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
    borderRadius: 12,
    marginBottom: 16,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#667eea',
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
  },
  messageText: {
    fontSize: 16,
    color: '#1f2937',
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
    color: '#6b7280',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    alignSelf: 'flex-end',
  },
});

export default AIScreen;