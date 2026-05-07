import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './src/screens/HomeScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import CreateProductScreen from './src/screens/CreateProductScreen';
import EditProductScreen from './src/screens/EditProductScreen';

const STORAGE_KEY = 'productos_cafeteria_los_molinos';

const productosIniciales = [
  { id: '1', nombre: 'Capuccino Los Molinos', precio: '$8.500' },
  { id: '2', nombre: 'Latte Vainilla', precio: '$9.000' },
  { id: '3', nombre: 'Mocaccino', precio: '$9.500' },
  { id: '4', nombre: 'Tinto Tradicional', precio: '$3.000' },
];

export default function App() {
  const [pantallaActual, setPantallaActual] = useState('inicio');
  const [productoEditando, setProductoEditando] = useState(null);
  const [productos, setProductos] = useState(productosIniciales);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const datos = await AsyncStorage.getItem(STORAGE_KEY);

      if (datos) {
        setProductos(JSON.parse(datos));
      }
    } catch (error) {
      console.log('Error al cargar productos:', error);
    }
  };

  const guardarEnMemoria = async (lista) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
      console.log('Productos guardados:', lista);
    } catch (error) {
      console.log('Error al guardar productos:', error);
    }
  };

  const irAInicio = () => setPantallaActual('inicio');
  const irAProductos = () => setPantallaActual('productos');
  const irACrear = () => setPantallaActual('crear');
  const irAEditar = () => setPantallaActual('editar');

  const guardarProducto = async (nombre, precio) => {
    const nuevoProducto = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      precio: `$${precio.trim()}`,
    };

    const nuevaLista = [...productos, nuevoProducto];

    setProductos(nuevaLista);
    await guardarEnMemoria(nuevaLista);

    Alert.alert('Producto guardado', 'El producto fue agregado correctamente.');
    irAProductos();
  };

  const eliminarProducto = (id, nombre) => {
    Alert.alert(
      'Eliminar producto',
      `¿Seguro que deseas eliminar "${nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const nuevaLista = productos.filter((producto) => producto.id !== id);

            setProductos(nuevaLista);
            await guardarEnMemoria(nuevaLista);

            Alert.alert('Producto eliminado', 'El producto fue eliminado correctamente.');
          },
        },
      ]
    );
  };

  const seleccionarProductoAEditar = (producto) => {
    setProductoEditando(producto);
    irAEditar();
  };

  const actualizarProducto = async (id, nombre, precio) => {
    const nuevaLista = productos.map((producto) =>
      producto.id === id
        ? {
            ...producto,
            nombre: nombre.trim(),
            precio: `$${precio.trim()}`,
          }
        : producto
    );

    setProductos(nuevaLista);
    await guardarEnMemoria(nuevaLista);

    Alert.alert('Producto actualizado', 'El producto fue editado correctamente.');
    setProductoEditando(null);
    irAProductos();
  };

  if (pantallaActual === 'productos') {
    return (
      <ProductsScreen
        productos={productos}
        volverInicio={irAInicio}
        irACrear={irACrear}
        eliminarProducto={eliminarProducto}
        seleccionarProductoAEditar={seleccionarProductoAEditar}
      />
    );
  }

  if (pantallaActual === 'crear') {
    return (
      <CreateProductScreen
        guardarProducto={guardarProducto}
        volverInicio={irAInicio}
      />
    );
  }

  if (pantallaActual === 'editar') {
    return (
      <EditProductScreen
        producto={productoEditando}
        actualizarProducto={actualizarProducto}
        volverProductos={irAProductos}
      />
    );
  }

  return <HomeScreen irAProductos={irAProductos} />;
}