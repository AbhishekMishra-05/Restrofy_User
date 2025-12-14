import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function OrdersHistoryScreen() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // ✅ Fetch userId from AsyncStorage
    const fetchUserId = async () => {
      try {
        const storedUserId = "HiAkScI2ABcqygVAyuC1ZgaW0ku1"; // TODO: Replace with AsyncStorage.getItem("userId") later
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          console.warn("⚠️ No userId found in AsyncStorage");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching userId:", error);
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, "orders"), where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 🔹 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 24 }} /> {/* Spacer for symmetry */}
      </View>

      {/* 🔹 Empty state */}
      {orders.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No orders yet 🛒</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.orderId}>Order ID: {item.id}</Text>
              <Text style={styles.label}>Table: {item.table}</Text>
              <Text style={styles.label}>Status: {item.orderStatus}</Text>
              <Text style={styles.label}>Total: ₹{item.total}</Text>
              <Text style={styles.label}>Payment: {item.paymentStatus}</Text>
              <Text style={styles.labelSmall}>
                Items: {item.cart?.length || 0}
              </Text>
            </View>
          )}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6B00",
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    elevation: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyText: { color: "#999", fontSize: 16 },
  card: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
  },
  orderId: { fontWeight: "bold", color: "#FF6B00", marginBottom: 4 },
  label: { color: "#333", fontSize: 15 },
  labelSmall: { color: "#777", fontSize: 13, marginTop: 4 },
});
