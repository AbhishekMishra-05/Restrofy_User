// FloatingCartBarDark.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function FloatingCartBarDark({ cart, total, onPress }) {
  if (cart.length === 0) return null;
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <Ionicons name="cart-outline" size={20} color="#fff" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.itemText}>
              {cart.length} {cart.length > 1 ? "items" : "item"} • ₹{total.toFixed(2)}
            </Text>
            <Text style={styles.subText}>Includes all taxes</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
          <Text style={styles.buttonText}>View Cart ➜</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 16,
    width: "100%",
    paddingHorizontal: 16,
  },
  container: {
    backgroundColor: "#333333",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  subText: {
    color: "#cccccc",
    fontSize: 12,
    marginTop: 2,
  },
  button: {
    backgroundColor: "#dbad15ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: "#0a0000ff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
