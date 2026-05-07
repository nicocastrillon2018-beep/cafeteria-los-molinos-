import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

export default function EditProductScreen({
  producto,
  actualizarProducto,
  volverProductos,
}) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setPrecio(producto.precio.replace('$', ''));
    }
  }, [producto]);

  const handleActualizar = () => {
    if (!nombre.trim() || !precio.trim()) {
      Alert.alert(
        'Campos obligatorios',
        'Por favor completa el nombre y el precio del producto.'
      );
      return;
    }

    actualizarProducto(producto.id, nombre, precio);
  };

  if (!producto) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No hay producto seleccionado</Text>

        <Pressable style={styles.secondaryButton} onPress={volverProductos}>
          <Text style={styles.secondaryText}>Volver a productos</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar producto</Text>

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

      <Pressable style={styles.button} onPress={handleActualizar}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={volverProductos}>
        <Text style={styles.secondaryText}>Volver a productos</Text>
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