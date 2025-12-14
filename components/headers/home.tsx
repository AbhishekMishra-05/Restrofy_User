import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HeaderComponent({ onButtonPress }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        if (storedName) setUserName(storedName);
      } catch (error) {
        console.log("Error fetching user name:", error);
      }
    };
    fetchUser();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>{getGreeting()},</Text>
        <Text style={styles.userName}>{userName || "Guest"}</Text>
      </View>

      <TouchableOpacity style={styles.iconButton} onPress={onButtonPress}>
        <Ionicons name="person-circle-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1E1E2C",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    color: "#B0B0B0",
    fontSize: 14,
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  iconButton: {
    backgroundColor: "#3E3E55",
    borderRadius: 50,
    padding: 6,
  },
});
