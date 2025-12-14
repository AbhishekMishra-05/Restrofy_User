import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const SidebarWithModal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(width)).current;
  const navigation = useNavigation();

  const open = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 350,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  };

  const close = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 250,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  const confirmLogout = async () => {
    try {
      await AsyncStorage.clear();
      close();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Overlay to close sidebar when tapped outside */}
      <Pressable style={styles.overlay} onPress={close}>
        <Animated.View
          style={[
            styles.sidebarContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <View style={styles.sidebar}>
            {/* 👤 Profile */}
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => {
                close();
                navigation.navigate("Profile");
              }}
            >
              <Ionicons name="person-circle-outline" size={26} color="#222" />
            </TouchableOpacity>

            {/* ⚙ Settings */}
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => {
                close();
                navigation.navigate("Settings");
              }}
            >
              <Ionicons name="settings-outline" size={26} color="#222" />
            </TouchableOpacity>

            {/* 🧾 Order History */}
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => {
                close();
                navigation.navigate("OrderHistory");
              }}
            >
              <Ionicons name="receipt-outline" size={26} color="#222" />
            </TouchableOpacity>

            {/* ❓ Help */}
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => {
                close();
                navigation.navigate("Help");
              }}
            >
              <Ionicons name="help-circle-outline" size={26} color="#222" />
            </TouchableOpacity>

            {/* 🚪 Logout */}
            <TouchableOpacity
              style={[styles.iconBtn, { backgroundColor: "#E53935" }]}
              onPress={confirmLogout}
            >
              <Ionicons name="log-out-outline" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </>
  );
});

export default SidebarWithModal;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.05)",
    zIndex: 999,
  },
  sidebarContainer: {
    position: "absolute",
    right: 10,
    top: "25%",
  },
  sidebar: {
    backgroundColor: "#e5e5e5",
    paddingVertical: 10,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    width: 70,
  },
  iconBtn: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 50,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
});
