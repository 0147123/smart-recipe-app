import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import InventoryItem from '../components/InventoryItem';

const InventoryScreen = ({ navigation }) => {
  const [inventory, setInventory] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Inventory</Text>
      <FlatList
        data={inventory}
        renderItem={({ item }) => <InventoryItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No ingredients added yet.</Text>}
      />
      <Button title="Add New Ingredient" onPress={() => navigation.navigate('Add Ingredient')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 }
});

export default InventoryScreen;
