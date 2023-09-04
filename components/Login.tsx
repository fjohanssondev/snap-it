import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
 
export default function Login() {

  const { signIn, setActive, isLoaded } = useSignIn();
 
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
 
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <View>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>
 
      <View>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.button__text}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10,
    borderRadius: 3,
  },
  button: {
    borderRadius: 3,
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
  },
  button__text: {
    color: 'white',
    textAlign: 'center',
  },
});