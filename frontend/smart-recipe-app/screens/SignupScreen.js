// screens/SignupScreen.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { emailValidation } from '../utils/validation';

const SignupScreen = ({ navigation, handleLogin }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  const onSubmit = (data) => {
    console.log(data);
    if (!emailValidation(data.email)) return alert('Invalid email');
    if (data.password.length < 6) return alert('Password must be at least 6 characters');
    // handleSignup(); // Call handleSignup directly from props

    handleLogin(); // Call handleLogin directly from props
    // navigation.navigate('Profile'); // Navigate to Profile after signup
  };

  return (
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
      <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
      <Button title="Already have an account? Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5 },
});

export default SignupScreen;
