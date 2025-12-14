import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function MenuItemCard({ item, cartItem, onAdd, onRemove }) {
  return (
    <LinearGradient
      colors={["#d9b857ff", "#fefefdff"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.card}
    >
      {/* Left: Image space */}
      <View style={styles.imageWrapper}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage} />
        )}
      </View>

      {/* Right: Name and Price */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
      </View>

      {/* Quantity Controls */}
      <View style={styles.quantityControls}>
        {cartItem && cartItem.quantity > 0 ? (
          <>
            {/* Minus Button */}
            <TouchableOpacity style={styles.controlButton} onPress={onRemove}>
              <Text style={styles.controlText}>−</Text>
            </TouchableOpacity>

            {/* Quantity Display */}
            <Text style={styles.quantityText}>{cartItem.quantity}</Text>

            {/* Plus Button */}
            <TouchableOpacity style={styles.controlButton} onPress={onAdd}>
              <Text style={styles.controlText}>+</Text>
            </TouchableOpacity>
          </>
        ) : (
          // Only + Button if no item in cart yet
          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 20, // increased vertical padding
    alignItems: "center",
    position: "relative",
    elevation: 3,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f2d98d",
  },
  imageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f5e6b3",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333",
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#777",
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    backgroundColor: "#b57205ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginHorizontal: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#ffa500",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  controlText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 20,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    minWidth: 25,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#b57205ff",
    paddingHorizontal: 14,
    top:32,
    right:-12,
    paddingVertical: 6,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#ffa500",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  addText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
