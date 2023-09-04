import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

export default function TabsPage() {
  return (
    <Tabs>
      <Tabs.Screen name='home' options={{ headerShown: false }}></Tabs.Screen>
      <Tabs.Screen name='snap' options={{ headerShown: false }}></Tabs.Screen>
      <Tabs.Screen name='profile' options={{ headerTitle: 'Profile' }}></Tabs.Screen>
    </Tabs>
  )
}

const styles = StyleSheet.create({})