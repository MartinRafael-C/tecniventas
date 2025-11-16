import { GoogleGenerativeAI } from '@google/generative-ai';

// IMPORTANTE: En producción, usa variables de entorno
const API_KEY = 'TU_GEMINI_API_KEY'; // Obtener en https://makersuite.google.com/app/apikey

const genAI = new GoogleGenerativeAI(API_KEY);

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const geminiService = {
  sendMessage: async (message: string, history: Message[] = []): Promise<string> => {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Construir el contexto de la conversación
      const context = `Eres un asistente de ventas experto para una tienda en línea. 
Ayuda a los usuarios a encontrar productos, responde preguntas sobre características, 
precios, categorías disponibles y brinda recomendaciones personalizadas.

Categorías disponibles: Smartphones, Laptops, Fragancias, Cuidado de Piel, 
Comestibles, Decoración, Muebles, Ropa, Zapatos, Relojes, Bolsos, Joyería, 
Gafas de Sol, Automotriz, Motocicletas, Iluminación.

Historial de conversación:
${history.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Usuario: ${message}
Asistente:`;

      const result = await model.generateContent(context);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error en Gemini:', error);
      throw new Error('No se pudo procesar tu mensaje. Intenta nuevamente.');
    }
  },

  getProductRecommendations: async (preferences: string): Promise<string> => {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `Como experto en ventas, recomienda productos específicos basándote en estas preferencias del usuario: "${preferences}". 
      
Las categorías disponibles son: Smartphones, Laptops, Fragancias, Cuidado de Piel, Comestibles, Decoración, Muebles, Ropa, Zapatos, Relojes, Bolsos, Joyería, Gafas de Sol, Automotriz, Motocicletas, Iluminación.

Proporciona 3-5 recomendaciones específicas con una breve explicación de por qué son buenas opciones.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error obteniendo recomendaciones:', error);
      throw new Error('No se pudieron generar recomendaciones.');
    }
  },
};