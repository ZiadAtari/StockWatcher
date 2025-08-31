import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="Homepage" />
      <Stack.Screen name="Stock Profile" />
    </Stack>
  );
}
