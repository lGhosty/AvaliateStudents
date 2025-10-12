import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>FH</Text>
      </View>
      
      <Text style={styles.name}>Felipe Hapolo</Text>
      <Text style={styles.email}>fehapolo@email.com</Text>
      
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Sair (Logout)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#f5f5f5', paddingTop: 40 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: { color: '#fff', fontSize: 48, fontWeight: 'bold' },
  name: { fontSize: 22, fontWeight: '600', marginBottom: 5 },
  email: { fontSize: 16, color: 'gray', marginBottom: 40 },
  logoutButton: {
    borderColor: '#dc3545',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  logoutButtonText: { color: '#dc3545', fontSize: 16 },
  backButton: { backgroundColor: '#6c757d', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5 },
  backButtonText: { color: '#fff', fontSize: 18 },
});
