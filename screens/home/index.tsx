import React, { useRef } from "react";
import { View, Button, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from "../../components/headers/home";
import SidebarWithModal from "../../components/modals/sidebar";

export default function HomeScreen({ navigation }) {
  const codeValue = "PB09wcpzMSTTobFGOYP9vuHaAZ12";
  const sidebarRef = useRef(null);

  const handleHeaderButtonPress = () => {
    if (sidebarRef.current) {
      sidebarRef.current.open();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar backgroundColor="#1E1E2C" barStyle="light-content" />

      {/* 🔹 Header */}
      <HeaderComponent onButtonPress={handleHeaderButtonPress} />

      {/* 🔹 Main Body */}
      <View style={styles.body}>
        <Button
          title="Skip Scanner"
          onPress={() => navigation.navigate("Menu", { qrData: codeValue })}
        />
      </View>

      {/* 🔹 Sidebar Modal */}
      <SidebarWithModal ref={sidebarRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1E1E2C",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
