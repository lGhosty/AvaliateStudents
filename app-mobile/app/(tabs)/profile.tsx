import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext'; 

export default function ProfileScreen() {
  const { user, logout } = useAuth();
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

  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      
      <TouchableOpacity onPress={handleChoosePhoto}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{user?.nome?.substring(0, 2).toUpperCase() || 'U'}</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.changePhotoText}>Alterar foto</Text>
      
      <Text style={styles.name}>{user?.nome || 'Usuário Anônimo'}</Text>
      <Text style={styles.email}>{user?.email || 'email@exemplo.com'}</Text>
      
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Sair (Logout)</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', backgroundColor: '#f5f5f5', paddingTop: 40 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 10, backgroundColor: '#ccc' },
    avatarPlaceholder: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    avatarText: { color: '#fff', fontSize: 48, fontWeight: 'bold' },
    changePhotoText: { color: '#007bff', marginBottom: 30, fontSize: 16 },
    name: { fontSize: 22, fontWeight: '600', marginBottom: 5 },
    email: { fontSize: 16, color: 'gray', marginBottom: 40 },
    logoutButton: { borderColor: '#dc3545', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8, marginTop: 'auto', marginBottom: 20 },
    logoutButtonText: { color: '#dc3545', fontSize: 16, fontWeight: 'bold' },
});
