import React, { useRef, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Camera, CameraType } from "react-native-camera-kit";

export default function QRScanner({ navigation }) {
  const cameraRef = useRef(null);
  const [scanned, setScanned] = useState(false);

  const handleReadCode = (event) => {
    if (!scanned) {
      setScanned(true);
      let codeValue = event.nativeEvent.codeStringValue; // QR value (could be full URL or UID)

      try {
        if (codeValue.includes("/")) {
          codeValue = codeValue.split("/").pop();
        }

        // ✅ Navigate to Menu screen with only UID
        navigation.navigate("Menu", { qrData: codeValue });
      } catch (err) {
        Alert.alert("Error", "Invalid QR code format. Please try again.");
        setScanned(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        cameraType={CameraType.Back}
        flashMode="auto"
        scanBarcode={true}
        onReadCode={handleReadCode}
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        <View style={styles.overlayPart} />
        <View style={styles.centerRow}>
          <View style={styles.overlayPart} />
          <View style={styles.transparentBox} />
          <View style={styles.overlayPart} />
        </View>
        <View style={styles.overlayPart} />
      </View>
    </View>
  );
}

const BOX_SIZE = 250;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  overlay: { flex: 1 },
  overlayPart: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  centerRow: { flexDirection: "row" },
  transparentBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 12,
    backgroundColor: "transparent",
  },
});
