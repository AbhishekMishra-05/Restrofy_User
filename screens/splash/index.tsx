import React, { useEffect } from "react";
import { Text, Image, StyleSheet, StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { checkLogin } from "../../backend/auth";

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const verify = async () => {
      const user = await checkLogin();
      if (user) {
        navigation.replace("Home");
      } else {
        navigation.replace("Login");
      }
    };

    const timer = setTimeout(verify, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={["#a31c4eff", "#74051dff"]} style={styles.container}>
      <Text style={styles.title}>Restrofy</Text>
      <StatusBar backgroundColor="#a31c4eff" barStyle="light-content" />
      <Image
        source={require("../../assets/chef.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>Serve Happiness to your plate</Text>
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 32, fontWeight: "bold", color: "#fff", marginBottom: 30 },
  image: { width: 200, height: 200, marginBottom: 30 },
  subtitle: { fontSize: 16, fontStyle: "italic", color: "#f1f1f1" },
});         