import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const router = useRouter();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "É preciso permitir o acesso à galeria para escolher uma foto.");
      return;
    }
      
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
      
    if (!pickerResult.canceled) {
      setAvatarUri(pickerResult.assets[0].uri);
    }
  };
  
  const handleLogout = () => {
    router.replace('/(auth)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      
      <TouchableOpacity onPress={handleChoosePhoto}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>FH</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.changePhotoText}>Alterar foto</Text>
      <Text style={styles.name}>Felipe Hapolo</Text>
      <Text style={styles.email}>fehapolo@email.com</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair (Logout)</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', backgroundColor: '#f5f5f5', paddingTop: 40 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    avatar: { width
