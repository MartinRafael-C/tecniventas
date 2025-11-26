// App.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AIScreen from './screens/AIScreen';
import SettingsScreen from './screens/SettingsScreen';
import BottomNav from './components/BottomNav';

function AppContent() {
  const { theme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);

  const handleToggleFavorite = (product: any) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === product.id);
      if (exists) {
        return prev.filter(f => f.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedProduct(null);
    setSelectedCategory(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('home');
    setFavorites([]);
  };

  if (!isAuthenticated) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <AuthScreen onLogin={() => setIsAuthenticated(true)} />
      </View>
    );
  }

  if (selectedProduct) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ProductDetailScreen
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </View>
    );
  }

  if (selectedCategory) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ProductListScreen
          category={selectedCategory}
          onSelectProduct={setSelectedProduct}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {activeTab === 'home' && <HomeScreen onSelectCategory={setSelectedCategory} />}
      {activeTab === 'favorites' && (
        <FavoritesScreen
          favorites={favorites}
          onSelectProduct={setSelectedProduct}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
      {activeTab === 'ai' && <AIScreen />}
      {activeTab === 'settings' && <SettingsScreen onLogout={handleLogout} />}
      
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});