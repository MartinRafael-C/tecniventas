import axios from 'axios';
import { Product } from '../types';

const API_BASE_URL = 'https://dummyjson.com';

export const api = {
  // Obtener todos los productos
  getAllProducts: async (limit = 100): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE_URL}/products?limit=${limit}`);
    return response.data.products;
  },

  // Buscar productos
  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE_URL}/products/search?q=${query}`);
    return response.data.products;
  },

  // Obtener productos por categoría
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE_URL}/products/category/${category}`);
    return response.data.products;
  },

  // Obtener un producto específico
  getProductById: async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  },

  // Obtener todas las categorías
  getCategories: async (): Promise<string[]> => {
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
    return response.data;
  },
};

// Mapeo de categorías a iconos y nombres en español
export const categoryConfig: { [key: string]: { name: string; icon: string; } } = {
  smartphones: { name: 'Smartphones', icon: '📱' },
  laptops: { name: 'Laptops', icon: '💻' },
  fragrances: { name: 'Fragancias', icon: '🌸' },
  skincare: { name: 'Cuidado de Piel', icon: '🧴' },
  groceries: { name: 'Comestibles', icon: '🛒' },
  'home-decoration': { name: 'Decoración', icon: '🏠' },
  furniture: { name: 'Muebles', icon: '🪑' },
  tops: { name: 'Ropa Superior', icon: '👕' },
  'womens-dresses': { name: 'Vestidos', icon: '👗' },
  'womens-shoes': { name: 'Zapatos Mujer', icon: '👠' },
  'mens-shirts': { name: 'Camisas Hombre', icon: '👔' },
  'mens-shoes': { name: 'Zapatos Hombre', icon: '👞' },
  'mens-watches': { name: 'Relojes Hombre', icon: '⌚' },
  'womens-watches': { name: 'Relojes Mujer', icon: '⌚' },
  'womens-bags': { name: 'Bolsos', icon: '👜' },
  'womens-jewellery': { name: 'Joyería', icon: '💍' },
  sunglasses: { name: 'Gafas de Sol', icon: '🕶️' },
  automotive: { name: 'Automotriz', icon: '🚗' },
  motorcycle: { name: 'Motocicletas', icon: '🏍️' },
  lighting: { name: 'Iluminación', icon: '💡' },
};