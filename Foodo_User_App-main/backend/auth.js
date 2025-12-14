import { auth, db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * 💾 Save User UID Locally
 */
const saveUserSession = async (uid) => {
  try {
    await AsyncStorage.setItem("userUID", uid);
    await AsyncStorage.setItem("role", "user");
    console.log("✅ User session stored:", uid);
  } catch (err) {
    console.error("❌ Error saving user session:", err);
  }
};

/**
 * 🧹 Clear User Session
 */
const clearUserSession = async () => {
  try {
    await AsyncStorage.removeItem("userUID");
    await AsyncStorage.removeItem("role");
    console.log("🧹 user session cleared");
  } catch (err) {
    console.error("❌ Error clearing session:", err);
  }
};

/**
 * 🔐 SIGNUP User
 */
export const signup = async (email, password, userName, rememberMe) => {
  if (!email || !password || !userName) {
    throw new Error("Please fill all fields");
  }

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  // ✅ Create User document in Firestore
  await setDoc(doc(db, "users", user.uid), {
    email,
    role: "user",
    userName,
    createdAt: serverTimestamp(),
  });

  // ✅ Save session if "Remember Me" checked
  if (rememberMe) {
    await saveUserSession(user.uid);
  }

  return { uid: user.uid, role: "user" };
};

/**
 * 🔑 LOGIN User
 */
export const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Please fill all fields");
  }

  const { user } = await signInWithEmailAndPassword(auth, email, password);

  // ✅ Check Firestore for user role
  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (!userDoc.exists()) {
    await signOut(auth);
    throw new Error("Account not found in user records");
  }

  const { role } = userDoc.data();
  if (role !== "user") {
    await signOut(auth);
    throw new Error("Unauthorized: This account is not a user");
  }

  // ✅ Always save session after successful login
  await saveUserSession(user.uid);

  return { uid: user.uid, role };
};

/**
 * 🚪 LOGOUT User
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    await clearUserSession();
  } catch (err) {
    console.error("❌ Logout failed:", err);
  }
};

/**
 * 🧠 CHECK LOGIN STATUS
 */
export const checkLogin = async () => {
  try {
    const uid = await AsyncStorage.getItem("userUID");
    const role = await AsyncStorage.getItem("role");

    if (!uid || role !== "user") return null;

    // ✅ Verify Firestore still has this user
    const docRef = doc(db, "users", uid);
    const userDoc = await getDoc(docRef);

    if (userDoc.exists() && userDoc.data().role === "user") {
      return { uid, role: "user" };
    } else {
      await clearUserSession();
      await signOut(auth);
      return null;
    }
  } catch (err) {
    console.error("❌ checkLogin error:", err);
    return null;
  }
};
