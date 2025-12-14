// screens/OrderSuccess.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function OrderSuccess({ route, navigation }) {
  const { paymentId, total } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>🎉 Payment Successful!</Text>
      <Text style={styles.details}>Payment ID: {paymentId}</Text>
      <Text style={styles.details}>Total Paid: ₹{total.toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.btnText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  successText: { fontSize: 22, fontWeight: "bold", color: "#28a745", marginBottom: 10 },
  details: { color: "#333", marginVertical: 4 },
  btn: { backgroundColor: "#FF6B00", padding: 12, borderRadius: 10, marginTop: 20 },
  btnText: { color: "#fff", fontWeight: "bold" },
});
