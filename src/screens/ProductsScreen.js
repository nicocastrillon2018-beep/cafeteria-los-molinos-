import { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  RefreshControl,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProductsScreen({
  productos,
  volverInicio,
  irACrear,
  eliminarProducto,
  seleccionarProductoAEditar,
}) {
  const [refreshing, setRefreshing] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Menú de productos</Text>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar producto..."
            placeholderTextColor="#8A6A55"
            value={busqueda}
            onChangeText={setBusqueda}
          />
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={productosFiltrados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.productRow}>
                  <View style={styles.productInfo}>
                    <Text style={styles.name}>{item.nombre}</Text>
                    <Text style={styles.price}>{item.precio}</Text>
                  </View>

                  <View style={styles.iconActions}>
                    <Pressable
                      style={styles.editIconButton}
                      onPress={() => seleccionarProductoAEditar(item)}
                    >
                      <MaterialIcons name="edit" size={24} color="#2563EB" />
                    </Pressable>

                    <Pressable
                      style={styles.deleteIconButton}
                      onPress={() => eliminarProducto(item.id, item.nombre)}
                    >
                      <MaterialIcons
                        name="delete-outline"
                        size={26}
                        color="#B91C1C"
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.empty}>No se encontraron productos.</Text>
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#8B4A22']}
              />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              productosFiltrados.length === 0 ? styles.emptyContainer : null
            }
          />
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={irACrear}>
            <Text style={styles.primaryText}>Agregar producto</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={volverInicio}>
            <Text style={styles.secondaryText}>Volver al inicio</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8F1',
  },

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3A2415',
    marginBottom: 16,
  },

  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6D5C7',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#3A2415',
  },

  listContainer: {
    flex: 1,
  },

  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E6D5C7',
  },

  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  productInfo: {
    flex: 1,
    paddingRight: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A2415',
  },

  price: {
    fontSize: 15,
    color: '#8B4A22',
    marginTop: 6,
    fontWeight: '600',
  },

  iconActions: {
    flexDirection: 'row',
    gap: 8,
  },

  editIconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteIconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  empty: {
    textAlign: 'center',
    color: '#6C4A34',
    fontSize: 16,
  },

  actions: {
    gap: 10,
    marginTop: 12,
    paddingTop: 8,
  },

  primaryButton: {
    backgroundColor: '#8B4A22',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  primaryText: {
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