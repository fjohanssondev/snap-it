import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignIn } from '@clerk/clerk-expo';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
 
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      setError(err.message);
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
      {error && <Text>{error}</Text>}
      <Text>No account? <Link className='text-blue-700 underline font-semibold' href="/register">Click here</Link></Text>
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
