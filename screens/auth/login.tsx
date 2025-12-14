import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  StatusBar,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Components
import AuthInputField from "../../components/textfields/auth";
import AuthButton from "../../components/buttons/authButton";
import TextButton from "../../components/buttons/Text";

// Backend auth
import { login } from "../../backend/auth";

// Navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigator/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [rememberMe, setRememberMe] = useState(false); // ✅ New

  const handleLogin = async () => {
    try {
      const { uid, role } = await login(email, password);
      navigation.replace("Home", { uid });
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Login Error", error.message);
      } else {
        Alert.alert("Login Error", "Something went wrong");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <StatusBar backgroundColor="#ffffffff" barStyle="dark-content" translucent={false} />

      {/* Input Fields */}
      <AuthInputField
        icon="account"
        placeholder="Enter Email Address"
        value={email}
        onChangeText={setEmail}
      />
      <AuthInputField
        icon="lock"
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureText}
        showToggle
        onToggleSecure={() => setSecureText(!secureText)}
      />

      {/* ✅ Remember Me */}
      <Pressable
        style={styles.rememberContainer}
        onPress={() => setRememberMe(!rememberMe)}
      >
        <View style={[styles.checkbox, rememberMe && styles.checked]}>
          {rememberMe && <View style={styles.innerCheck} />}
        </View>
        <Text style={styles.rememberText}>Remember Me</Text>
      </Pressable>

      {/* Login Button */}
      <AuthButton title="Log In" onPress={handleLogin} />

      {/* Forget Password */}
      <View style={styles.forgotContainer}>
        <TextButton
          title="Forget Password?"
          onPress={() => {}}
          color="#8b005d"
          style={{}} // Fix TS error
        />
      </View>

      {/* Or Continue With */}
      <Text style={styles.continueText}>Or Continue with</Text>

      {/* Social Icons */}
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../../assets/icons8-google-22.png")}
            style={{ width: 22, height: 22 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="call" size={22} color="#34A853" />
        </TouchableOpacity>
      </View>

      {/* Don't have an account? Signup */}
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={{ marginTop: 30, fontSize: 14, color: "gray" }}>
          Don't have an account?{" "}
          <Text style={{ color: "#8b005d", fontWeight: "bold" }}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 30,
  },
  forgotContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10,
    marginBottom: 20,
  },
  continueText: {
    marginVertical: 15,
    fontWeight: "bold",
    color: "gray",
    fontSize: 16,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  // ✅ Remember Me styles
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
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
});    