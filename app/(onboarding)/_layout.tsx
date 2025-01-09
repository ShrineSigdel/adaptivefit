import { Stack, Slot } from "expo-router";

export default function OnboardLayout() {
    return (
        <Stack>
            <Stack.Screen name="page1" />
            <Stack.Screen name="page2" />
            <Stack.Screen name="page3" />
            <Slot />
        </Stack>
    );
}
