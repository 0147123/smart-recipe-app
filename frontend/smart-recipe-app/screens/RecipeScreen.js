import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import RecipeCard from '../components/RecipeCard';

const RecipeScreen = () => {
  const recipes = [
    { id: '1', title: 'Spaghetti Bolognese', ingredients: ['Spaghetti', 'Tomato Sauce', 'Ground Beef'] },
    { id: '2', title: 'Vegetable Stir Fry', ingredients: ['Bell Peppers', 'Carrots', 'Broccoli'] },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggested Recipes</Text>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 }
});

export default RecipeScreen;
