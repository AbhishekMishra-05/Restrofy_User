import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Pressable,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { signup } from '../../backend/auth';  

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState(''); // ✅ changed
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !username) {
      Alert.alert('Error', 'Fill all fields');
      return;
    }

    try {
      const { uid } = await signup(email, password, username, rememberMe); // ✅ pass username
      Alert.alert('Success', 'Account created successfully!');
      navigation.replace('Main', { userID: uid }); // ✅ renamed for clarity
    } catch (error) {
      Alert.alert('Signup Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
      <StatusBar backgroundColor="#ffffffff" barStyle="dark-content" translucent={false}/>

      {/* Username */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="gray"
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="gray"
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="gray"
        />
      </View>

      {/* Remember Me */}
      <Pressable
        style={styles.rememberContainer}
        onPress={() => setRememberMe(!rememberMe)}
      >
        <View style={[styles.checkbox, rememberMe && styles.checked]}>
          {rememberMe && <View style={styles.innerCheck} />}
        </View>
        <Text style={styles.rememberText}>Remember Me</Text>
      </Pressable>

      {/* Sign Up Button */}
      <TouchableOpacity onPress={handleSignup} style={{ width: '100%' }}>
        <LinearGradient
          colors={['#8b005d', '#d40074']}
          style={styles.signupButton}
        >
          <Text style={styles.signupText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
  },
  input: {
    padding: 12,
    color: '#000',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    borderColor: '#8b005d',
    backgroundColor: '#8b005d',
  },
  innerCheck: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  rememberText: {
    marginLeft: 8,
    color: 'gray',
  },
  signupButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
