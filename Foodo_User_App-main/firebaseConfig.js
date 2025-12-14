import { initializeApp, getApps } from "firebase/app";
import { 
  getAuth,
  initializeAuth,
  getReactNativePersistence,
 } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl6cJOF3-IfJphVbV1LnDsOY_gaS_Fnvo",
  authDomain: "foodo-e69ca.firebaseapp.com",
  projectId: "foodo-e69ca",
  storageBucket: "foodo-e69ca.appspot.com",
  messagingSenderId: "856282364600",
  appId: "1:856282364600:android:517e42002f72f61448d24d",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db };

