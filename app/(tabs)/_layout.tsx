import { Tabs } from "expo-router";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Snap" />
      <Tabs.Screen name="test" />
    </Tabs>
  )
}