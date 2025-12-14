import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header({
  title,
  subtitle,
  navigation,
  showCart = true,
  cartCount = 0,
}) {
  // Animated press effect for buttons
  const scaleValue = new Animated.Value(1);
  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* LEFT: Back Button + Title */}
        <View style={styles.leftSection}>
          <AnimatedTouchable
            onPress={() => navigation.goBack()}
            style={[styles.backButton, { transform: [{ scale: scaleValue }] }]}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={28} color="#4b3f00" />
          </AnimatedTouchable>

          <View style={styles.titleWrapper}>
            <Text style={styles.title}>🍽️ {title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        </View>

        {/* RIGHT: Cart Button */}
        {showCart ? (
          <AnimatedTouchable
            onPress={() => navigation.navigate("CartScreen")}
            style={[styles.cartIconContainer, { transform: [{ scale: scaleValue }] }]}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            activeOpacity={0.8}
          >
            <Ionicons name="cart-outline" size={28} color="#4b3f00" />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </AnimatedTouchable>
        ) : (
          <View style={{ width: 28 }} />
        )}
      </View>
    </SafeAreaView>
  );
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff9e6",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#fcfbf7ff",
    borderBottomColor: "#fffffcff",
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  backButton: {
    paddingRight: 8,
  },

  titleWrapper: {
    marginLeft: 6,
    justifyContent: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#4b3f00",
    paddingHorizontal: -40,
    top:0,
    
  },

  subtitle: {
    fontSize: 14,
    color: "#f8f4f4ff",
    marginTop: 2,
  },

  cartIconContainer: {
    position: "relative",
    paddingHorizontal: -10,
    top: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  badge: {
    position: "absolute",
    top: -7,
    right: -7,
    backgroundColor: "#ff6b00",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
});
