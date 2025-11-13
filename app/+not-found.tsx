import { View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Not Found" }} />
      <Link href="/" style={styles.link}>
        Go to Home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  link: {
    marginTop: 20,
    color: "#1e90ff",
    fontSize: 18,
  },
});