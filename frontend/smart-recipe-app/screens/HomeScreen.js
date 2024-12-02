import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AddIngredientScreen from './AddIngredientScreen';
import InventoryScreen from './InventoryScreen';
import RecipeScreen from './RecipeScreen';

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Smart Recipe App</Text>
    <Button title="View Inventory" onPress={() => navigation.navigate('Inventory')} />
    <Button title="Add Ingredient" onPress={() => navigation.navigate('Add Ingredient')} />
    <Button title="Recipe Suggestions" onPress={() => navigation.navigate('Recipes')} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});

export default HomeScreen;
