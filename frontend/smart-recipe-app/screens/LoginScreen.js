import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const LoginScreen = ({ navigation, handleLogin }) => { // Access handleLogin directly from props
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    handleLogin(); // Call handleLogin directly from props
  };

  return (
    <ImageBackground
      source={require('../assets/Wallpaper.png')} // Ensure this path is correct
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
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
          style={[styles.button, { backgroundColor: '#4CAF50' }]} // Green background for Login
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FF5722' }]} // Orange background for Signup
            onPress={() => navigation.navigate('Signup')}
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
  loginButton: {
    backgroundColor: '#4CAF50', // Green background
    padding: 15,
    borderRadius: 10, // Rounded corners
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#FFFFFF', // White text
    fontSize: 16,
    fontWeight: 'bold',
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

export default LoginScreen;
