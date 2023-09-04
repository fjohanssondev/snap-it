import { Tabs } from "expo-router";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen name="Home" options={{ headerShown: false }} />
      <Tabs.Screen name="Snap" options={{ headerShown: false }} />
      <Tabs.Screen name="test" />
    </Tabs>
  )
}