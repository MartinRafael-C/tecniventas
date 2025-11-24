import React, { useState } from 'react';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AIScreen from './screens/AIScreen';
import BottomNav from './components/BottomNav';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const handleToggleFavorite = (product) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === product.id);
      if (exists) {
        return prev.filter(f => f.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedProduct(null);
    setSelectedCategory(null);
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  if (selectedProduct) {
    return (
      <>
        <ProductDetailScreen
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </>
    );
  }

  if (selectedCategory) {
    return (
      <>
        <ProductListScreen
          category={selectedCategory}
          onSelectProduct={setSelectedProduct}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </>
    );
  }

  return (
    <>
      {activeTab === 'home' && <HomeScreen onSelectCategory={setSelectedCategory} />}
      {activeTab === 'favorites' && (
        <FavoritesScreen
          favorites={favorites}
          onSelectProduct={setSelectedProduct}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
      {activeTab === 'ai' && <AIScreen />}
      
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </>
  );
}