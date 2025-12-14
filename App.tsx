import React from "react";
import { StatusBar } from "react-native";
import AppNavigator from "./navigator/AppNavigator";

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AppNavigator />
    </>
  );
}
