// screens/SignupScreen.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const SignupScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate('Profile'); // Navigate to Profile after signup
  };

  return (
    <ImageBackground
      source={require('../assets/Wallpaper.png')} // Ensure this path is correct
      style={styles.background}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FF5722' }]} // Green background for Login
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the whole screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF8700', // Ensure text is visible on the wallpaper
    fontWeight: 'bold', 
    backgroundColor: 'rgba(255, 255, 255, 0.75)', // Semi-transparent black background
  },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for better readability
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10, // Rounded corners
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF', // White text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
