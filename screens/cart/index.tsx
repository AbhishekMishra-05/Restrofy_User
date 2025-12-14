import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import RazorpayCheckout from "react-native-razorpay";
import { saveOrderToFirestore } from "../../backend/orders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendOrderNotification } from "../../backend/notification";

export default function CartScreen({ route, navigation }) {
  const { cart: initialCart, restaurantId } = route.params;

  const [cart, setCart] = useState(initialCart || []);
  const [userId, setUserId] = useState(null); // 👈 store userId here

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // ✅ Fetch userId from AsyncStorage on mount
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        // const id = await AsyncStorage.getItem("userId");
        const id = "HiAkScI2ABcqygVAyuC1ZgaW0ku1";
        if (id) {
          setUserId(id);
          console.log("Fetched userId:", id);
        } else {
          console.warn("No userId found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };
    fetchUserId();
  }, []);

  const updateQuantity = (item, action) => {
    const updated = cart.map((x) => {
      if (x.id === item.id) {
        const newQty =
          action === "add" ? x.quantity + 1 : Math.max(1, x.quantity - 1);
        return { ...x, quantity: newQty };
      }
      return x;
    });
    setCart(updated);
  };

  const removeItem = (itemId) => setCart(cart.filter((x) => x.id !== itemId));

  const handlePayment = async () => {
    if (cart.length === 0) {
      Alert.alert("Empty Cart", "Please add some items before proceeding.");
      return;
    }

    if (!userId) {
      Alert.alert("Error", "User not found. Please log in again.");
      return;
    }

    const options = {
      description: `Payment for your order`,
      image: "https://your-app-logo-url.png",
      currency: "INR",
      key: "rzp_test_RQB6yyf8DAiAv3", // test key
      amount: total * 100,
      name: "Foodo Restaurant",
      theme: { color: "#FF6B00" },
    };

    RazorpayCheckout.open(options)
      .then(async (data) => {
        const paymentId = data.razorpay_payment_id;
        Alert.alert("✅ Payment Successful", `Payment ID: ${paymentId}`);

        const orderData = {
          restaurantId,
          userId, // ✅ added from AsyncStorage
          cart,
          paymentStatus: "Paid",
          orderstatus: "new",
          paymentId,
          total,
        };

        const result = await saveOrderToFirestore(orderData);

        if (result.success) {
          await sendOrderNotification(restaurantId, result.orderId, total);
          navigation.navigate("OrderSuccess", {
            orderId: result.orderId,
            paymentId,
            total,
          });
        } else {
          Alert.alert("⚠️ Failed to save order", result.error);
        }
      })
      .catch((error) => {
        Alert.alert("❌ Payment Failed", error.description);
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.itemRow}>
        <View style={styles.imageBox}>
          <Ionicons name="fast-food-outline" size={32} color="#FF6B00" />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
        </View>

        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item, "remove")}>
            <Ionicons name="remove-circle-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item, "add")}>
            <Ionicons name="add-circle-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => removeItem(item.id)}
          style={styles.removeBtn}
        >
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#FF6B00" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
        </View>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      )}

      {/* Footer */}
      {cart.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>₹{total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutBtn} onPress={handlePayment}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#0c0601ff",
    marginTop: 30,
  },
  card: {
    backgroundColor: "#f8e3e3ff",
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    marginTop: 25,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#fefdfcff",
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#080000ff",
  },
  itemPrice: {
    color: "#4e4d4dff",
    fontSize: 14,
    marginTop: 4,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#606060ff",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 8,
  },
  qtyText: {
    color: "#faf7f7ff",
    fontWeight: "bold",
    marginHorizontal: 6,
  },
  removeBtn: {
    marginLeft: 4,
    padding: 6,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f8f7f7ff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#060101ff",
    elevation: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: "#090000ff",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#070605ff",
  },
  checkoutBtn: {
    backgroundColor: "#0c0805ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    color: "#f9f6f6ff",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#020101ff",
  },
  emptyText: { color: "#020101ff", fontSize: 16 },
});
