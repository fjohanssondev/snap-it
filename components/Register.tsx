import * as React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
 
export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();
 
  const [username, setUsername] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
 
  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      await signUp.create({
        emailAddress,
        password,
        username,
      });
 
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
 
      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
 
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  return (
    <View style={{ width: '100%' }}>
      {!pendingVerification && (
        <View>
          <View>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={username}
              placeholder="Username..."
              onChangeText={(username) => setUsername(username)}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>
 
          <View>
            <TextInput
              style={styles.input}
              value={password}
              placeholder="Password..."
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
 
          <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
            <Text style={styles.button__text}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <TextInput
              style={styles.input}
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={onPressVerify}>
            <Text style={styles.button__text}>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
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