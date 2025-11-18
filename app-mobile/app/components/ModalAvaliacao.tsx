import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../../constants/api';
import { useAuth } from '../../context/AuthContext';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  moradiaId: number;
  onSubmitSuccess: () => void;
}

export default ModalAvaliacao;

export function ModalAvaliacao({ isVisible, onClose, moradiaId, onSubmitSuccess }: Props) {
  const { token } = useAuth();
  const [nota, setNota] = useState('');
  const [comentario, setComentario] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const notaNum = parseFloat(nota);
    if (isNaN(notaNum) || notaNum < 1 || notaNum > 5) {
      Alert.alert('Erro', 'Por favor, insira uma nota válida de 1 a 5.');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/avaliacoes/moradia/${moradiaId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nota: notaNum,
          comentario: comentario
        })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Avaliação enviada!');
        onSubmitSuccess();
        setNota('');
        setComentario('');
        onClose();
      } else {
        throw new Error(data.message || 'Erro ao avaliar');
      }

    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Avalie esta Moradia</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nota (1 a 5)"
            value={nota}
            onChangeText={setNota}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Comentário (opcional)"
            value={comentario}
            onChangeText={setComentario}
            multiline
          />

          <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Enviar Avaliação</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
            <Text style={styles.buttonCancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'stretch' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { height: 50, backgroundColor: '#f5f5f5', borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 15, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top', paddingTop: 10 },
  buttonSubmit: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  buttonCancel: { marginTop: 10, padding: 10, alignItems: 'center' },
  buttonCancelText: { color: '#666', fontSize: 16 },
});
