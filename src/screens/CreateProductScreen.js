import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

export default function CreateProductScreen({ guardarProducto, volverInicio }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  const handleGuardar = async () => {
    if (!nombre.trim() || !precio.trim()) {
      Alert.alert(
        'Campos obligatorios',
        'Por favor completa el nombre y el precio del producto.'
      );
      return;
    }

    if (isNaN(Number(precio))) {
      Alert.alert(
        'Precio inválido',
        'Por favor ingresa solo números en el precio.'
      );
      return;
    }

    await guardarProducto(nombre, precio);

    setNombre('');
    setPrecio('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar producto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        placeholderTextColor="#8A6A55"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio del producto"
        placeholderTextColor="#8A6A55"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />

      <Pressable style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Guardar producto</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={volverInicio}>
        <Text style={styles.secondaryText}>Volver al inicio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1',
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3A2415',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEC8B6',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
    color: '#3A2415',
  },

  button: {
    backgroundColor: '#8B4A22',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  secondaryButton: {
    backgroundColor: '#F1E4D8',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DEC8B6',
  },

  secondaryText: {
    color: '#5A3723',
    fontSize: 16,
    fontWeight: 'bold',
  },
});