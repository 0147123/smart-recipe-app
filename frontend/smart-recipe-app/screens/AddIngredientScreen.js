import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddIngredientScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const addIngredient = () => {
    console.log('Ingredient added:', { name, expirationDate });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Ingredient Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Expiration Date"
        value={expirationDate}
        onChangeText={setExpirationDate}
        style={styles.input}
      />
      <Button title="Add Ingredient" onPress={addIngredient} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 20, fontSize: 16, padding: 5 }
});

export default AddIngredientScreen;
