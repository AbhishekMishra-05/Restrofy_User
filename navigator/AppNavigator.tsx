import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import SplashScreen from "../screens/splash";
import LoginScreen from "../screens/auth/login";
import HomeScreen from "../screens/home";
import QRScanner from "../screens/scanner";
import SignupScreen from "../screens/auth/signing";
import UserMenuScreen from "../screens/menu";
import CartScreen from "../screens/cart";
import OrderSuccess from "../screens/orders_stat/sucses";
import OrdersHistoryScreen from "../screens/order_history";

// ✅ Define and export type for navigation
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Scanner: undefined;
  Menu: undefined;
  Signup: undefined;
  Main: { uid: string };
  Cart: undefined;
  OrderSuccess: undefined;
  OrderHistory: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={QRScanner} />
        <Stack.Screen name="Menu" component={UserMenuScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        {/* <Stack.Screen name="Main" component={MainScreen} /> */}
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
        <Stack.Screen name="OrderHistory" component={OrdersHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
