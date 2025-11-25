// components/CategoryCard.tsx
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  // Aseguramos que los colores sean strings válidos
  const color1: string = category.color || '#667eea';
  const color2: string = (category.color || '#667eea') + 'dd';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={[color1, color2]}
        style={styles.container}
      >
        <Text style={styles.icon}>{category.icon}</Text>
        <Text style={styles.name}>{category.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default CategoryCard;