import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';

export default function HomeScreen({ irAProductos }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.badge}>CAFETERÍA LOS MOLINOS</Text>

          <View style={styles.logoCard}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>
            Bienvenido a Cafetería Los Molinos
          </Text>

          <Text style={styles.subtitle}>
            Donde encontrarás los mejores cafés de la ciudad de Medellín,para disfrutar en amigos o con tu familia,para mas informacion de nuestros productos entra al menu.
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={irAProductos}>
            <Text style={styles.primaryText}>Entrar al menú</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },

  header: {
    gap: 10,
    marginTop: 12,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E7C9A9',
    color: '#5C3822',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontWeight: 'bold',
    fontSize: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },

  subtitle: {
    fontSize: 15,
    color: '#311B04',
  },

  logoCard: {
    backgroundColor: '#FFF8F1',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E6D5C7',
    alignItems: 'center',
  },

  logo: {
    width: 250,
    height: 250,
  },

  actions: {
    marginBottom: 10,
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
});