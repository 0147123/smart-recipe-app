// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ handleLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    nickname: '',
    gender: '',
    ageRange: '',
    allergies: '',
    foodPreferences: '',
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const handleButtonSelect = (field, value) => {
    setProfile((prevProfile) => ({ ...prevProfile, [field]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleImagePick}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Personal Information</Text>

        {/* Name */}
        <View style={styles.field}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            value={profile.name}
            onChangeText={(text) => setProfile({ ...profile, name: text })}
            editable={isEditing}
          />
        </View>

        {/* Nickname */}
        <View style={styles.field}>
          <Text style={styles.label}>Nickname:</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.inputDisabled]}
            value={profile.nickname}
            onChangeText={(text) => setProfile({ ...profile, nickname: text })}
            editable={isEditing}
          />
        </View>

        {/* Gender */}
        <View style={styles.field}>
          <Text style={styles.label}>Gender:</Text>
          {isEditing ? (
            <View style={styles.buttonGroup}>
              {['Male', 'Female', 'Other'].map((option) => (
                <Button
                  key={option}
                  title={option}
                  onPress={() => handleButtonSelect('gender', option)}
                  color={profile.gender === option ? '#6200ea' : '#cccccc'}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.value}>
              {profile.gender || 'Please select your gender'}
            </Text>
          )}
        </View>

        {/* Age Range */}
        <View style={styles.field}>
          <Text style={styles.label}>Age Range:</Text>
          {isEditing ? (
            <View style={styles.buttonGroup}>
              {['18-25', '26-35', '36-45', '46+'].map((range) => (
                <Button
                  key={range}
                  title={range}
                  onPress={() => handleButtonSelect('ageRange', range)}
                  color={profile.ageRange === range ? '#6200ea' : '#cccccc'}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.value}>
              {profile.ageRange || 'Please select your age range'}
            </Text>
          )}
        </View>

        {/* Allergies */}
        <View style={styles.field}>
          <Text style={styles.label}>Allergies:</Text>
          {isEditing ? (
            <View style={styles.buttonGroup}>
              {['Peanuts', 'Dairy', 'Gluten', 'None'].map((allergy) => (
                <Button
                  key={allergy}
                  title={allergy}
                  onPress={() => handleButtonSelect('allergies', allergy)}
                  color={profile.allergies === allergy ? '#6200ea' : '#cccccc'}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.value}>
              {profile.allergies || 'Please select any allergies'}
            </Text>
          )}
        </View>

        {/* Food Preferences */}
        <View style={styles.field}>
          <Text style={styles.label}>Food Preferences:</Text>
          {isEditing ? (
            <View style={styles.buttonGroup}>
              {['Vegan', 'Vegetarian', 'Pescatarian', 'None'].map((preference) => (
                <Button
                  key={preference}
                  title={preference}
                  onPress={() => handleButtonSelect('foodPreferences', preference)}
                  color={profile.foodPreferences === preference ? '#6200ea' : '#cccccc'}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.value}>
              {profile.foodPreferences || 'Please select your food preferences'}
            </Text>
          )}
        </View>

        <Button title={isEditing ? "Save" : "Edit Profile"} onPress={handleEditToggle} />

        {/* Logout Button */}
        <Button title="Logout" color="#FF3B30" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  imageContainer: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60 },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: { color: '#666' },
  infoContainer: { width: '100%' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  field: { marginBottom: 15 },
  label: { fontSize: 16, fontWeight: 'bold' },
  value: { fontSize: 16, color: '#555', marginTop: 5 },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    fontSize: 16,
  },
  inputDisabled: { backgroundColor: '#f0f0f0', color: '#888' },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 5,
  },
});

export default ProfileScreen;
