import { Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home (){

  const { user } = useUser();

  return (
    <SafeAreaView>
      <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
    </SafeAreaView>
  )
}