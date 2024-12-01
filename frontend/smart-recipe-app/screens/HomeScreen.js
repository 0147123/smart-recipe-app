import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import WallpaperBackground from '../components/WallpaperBackground';

const HomeScreen = ({ navigation }) => (
  <ImageBackground
        source={require('../assets/Wallpaper.png')} // Ensure this path is correct
        style={styles.background}
      >
    <View style={styles.container}>
      <Text style={styles.title}>Smart Recipe App</Text>
      <Button title="View Inventory" onPress={() => navigation.navigate('Inventory')} />
      <Button title="Add Ingredient" onPress={() => navigation.navigate('Add Ingredient')} />
      <Button title="Recipe Suggestions" onPress={() => navigation.navigate('Recipe')} />
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the whole screen
  },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});

export default HomeScreen;
