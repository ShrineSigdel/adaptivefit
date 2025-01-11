import { Stack } from "expo-router";
import "./global.css";
import GlobalProvider from "@/lib/globalProvider";

export default function RootLayout() {
  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </GlobalProvider>
  );
}
