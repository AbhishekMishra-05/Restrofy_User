import axios from "axios";

const SERVER_URL = "https://foodo-server.onrender.com/api/sendOrderNotification";

/**
 * 🔔 Trigger a notification to merchant when order is placed
 */
export const sendOrderNotification = async (restaurantId, orderId, total) => {
  try {
    const res = await axios.post(SERVER_URL, {
      restaurantId,
      orderId,
      total,
    });

    console.log("✅ Notification sent successfully:", res.data);
  } catch (err) {
    console.error("❌ Notification API error:", err.response?.data || err.message);
  }
};
