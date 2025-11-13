import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{ title: 'Home' }} />
    <Stack.Screen name="UnitA" options={{ title: 'Unit A: Basic Jazz Chords' }} />
    <Stack.Screen name="VideoPlayer" options={{ title: 'Video Player' }} />
  </Stack>
}
