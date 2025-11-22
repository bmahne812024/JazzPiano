import { Text, View, StyleSheet, ImageBackground, Platform } from "react-native";
import { Link, Stack } from 'expo-router';

export default function Index() {
  const backgroundImage = Platform.OS === 'web' 
    ? require('../assets/images/background-desktop.png')
    : require('../assets/images/background-mobile.png');
  
  return (
    <>
      <Stack.Screen options={{ title: "Jazz Piano App", headerTintColor: "#fff", headerStyle: { backgroundColor: 'rgba(0, 0, 0, 1)' }, headerShadowVisible: false }} />
      <ImageBackground 
        source={backgroundImage}
        style={styles.container}
        resizeMode="cover"
      >
        <Link href="/UnitA" style={styles.button}>Unit A: Basic Jazz Chords</Link>
        <Text style={styles.text}>Progress: 0 out of 5</Text>
      </ImageBackground>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
  },
  button: {
    backgroundColor: "#1e90ff",
    color: "#fff",
    padding: 10,
    fontSize: 20,
    borderRadius: 5,
    marginTop: 20,
  },
});