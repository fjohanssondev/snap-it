import { Stack } from 'expo-router'

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen name='login'></Stack.Screen>
      <Stack.Screen name='register'></Stack.Screen>
    </Stack>
  )
}