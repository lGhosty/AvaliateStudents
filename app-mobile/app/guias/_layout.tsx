import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="register" />
      <Stack.Screen name="details" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="filter" />
    </Stack>
  );
}
