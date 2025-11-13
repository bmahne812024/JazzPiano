import { Text, View, StyleSheet } from "react-native";
import { Link, Stack } from 'expo-router';

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: "Jazz Piano App", headerTintColor: "#fff", headerStyle: { backgroundColor: 'rgba(231,71,223,0.5)' } }} />
      <View style={styles.container}>

        <Link href="/UnitA" style={styles.button}>Unit A: Basic Jazz Chords</Link>
        <Text style={styles.text}>Progress: 0 out of 5</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#0b073aff",
    justifyContent: "center",
    alignItems: "flex-start",
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