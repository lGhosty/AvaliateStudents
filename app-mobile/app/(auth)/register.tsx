import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_URL } from '../../constants/api';

export default function RegisterScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    // 1. Validação: Campos vazios
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // 2. Validação: Nome muito curto (Evita o "1")
    if (nome.trim().length < 3) {
      Alert.alert('Erro', 'O nome deve ter pelo menos 3 letras.');
      return;
    }

    // 3. Validação: Email válido (deve ter @ e .)
    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    // 4. Validação: Senha segura
    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso!', 'Conta criada com sucesso. Agora faça o login.');
        router.back();
      } else {
        Alert.alert('Erro no Cadastro', data.message || 'Não foi possível criar a conta.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crie sua Conta</Text>
      <TextInput style={styles.input} placeholder="Nome Completo" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Senha (mínimo 6)" value={senha} onChangeText={setSenha} secureTextEntry />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: '#333' },
    input: { height: 50, backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 15, fontSize: 16 },
    button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center', minHeight: 50, justifyContent: 'center' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    link: { color: '#007bff', textAlign: 'center', marginTop: 20, fontSize: 16 }
});
