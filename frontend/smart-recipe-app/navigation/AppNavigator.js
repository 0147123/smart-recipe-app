import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import InventoryScreen from '../screens/InventoryScreen';
import AddIngredientScreen from '../screens/AddIngredientScreen';
import RecipeScreen from '../screens/RecipeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Inventory" component={InventoryScreen} />
      <Stack.Screen name="Add Ingredient" component={AddIngredientScreen} />
      <Stack.Screen name="Recipes" component={RecipeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
