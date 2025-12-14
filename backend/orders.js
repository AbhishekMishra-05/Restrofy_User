// src/backend/orderAPI.js
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Save order to Firestore
 * @param {Object} orderData
 */
export const saveOrderToFirestore = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: serverTimestamp(),
    });
    console.log("✅ Order saved with ID:", docRef.id);
    return { success: true, orderId: docRef.id };
  } catch (error) {
    console.error("❌ Error saving order:", error);
    return { success: false, error: error.message };
  }
};
