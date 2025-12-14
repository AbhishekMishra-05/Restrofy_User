import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  onHomePress: () => void;
  onQRPress: () => void;
  onProfilePress: () => void;
};

export default function BottomNavBar({ onHomePress, onQRPress, onProfilePress }: Props) {
  return (
    <View style={styles.container}>
      {/* Left Button */}
      <TouchableOpacity style={styles.tab} onPress={onHomePress}>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

      {/* Middle Circle Button */}
      <TouchableOpacity style={styles.middleButton} onPress={onQRPress}>
        <Text style={styles.middleText}>QR</Text>
      </TouchableOpacity>

      {/* Right Button */}
      <TouchableOpacity style={styles.tab} onPress={onProfilePress}>
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: "black",
  },
  middleButton: {
    width: 60,
    height: 60,
    backgroundColor: "orange",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  middleText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});
