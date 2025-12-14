// src/backend/restaurantAPI.js
import { db } from "../firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

/**
 * ✅ Fetch restaurant details by ID
 */
export const fetchRestaurantDetails = async (restaurantId) => {
  if (!restaurantId) throw new Error("❌ No restaurantId provided.");

  try {
    // Remove any Firestore path parts if passed accidentally
    if (restaurantId.includes("/")) {
      restaurantId = restaurantId.split("/").pop();
    }

    console.log("📄 Fetching restaurant:", `restaurants/${restaurantId}`);

    const restRef = doc(db, "restaurants", restaurantId);
    const restSnap = await getDoc(restRef);

    if (!restSnap.exists()) {
      throw new Error(`❌ Restaurant not found for ID: ${restaurantId}`);
    }

    return { id: restaurantId, ...restSnap.data() };
  } catch (error) {
    console.error("🔥 Error fetching restaurant details:", error.message);
    throw error;
  }
};

/**
 * ✅ Fetch all categories of a restaurant
 */
export const fetchCategories = async (restaurantId) => {
  if (!restaurantId) throw new Error("❌ No restaurantId provided.");

  try {
    const catRef = collection(db, "restaurants", restaurantId, "categories");
    const catSnap = await getDocs(catRef);

    if (catSnap.empty) return [];

    return catSnap.docs.map((docSnap) => ({
      id: docSnap.id,
      name: docSnap.data().name?.trim() || docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error("🔥 Error fetching categories:", error.message);
    throw error;
  }
};

/**
 * ✅ Fetch all menu items under all categories
 * Ensures each item has both category name and category ID
 */
export const fetchAllMenuItems = async (restaurantId) => {
  if (!restaurantId) throw new Error("❌ No restaurantId provided.");

  try {
    const categoriesRef = collection(db, "restaurants", restaurantId, "categories");
    const categorySnapshots = await getDocs(categoriesRef);

    if (categorySnapshots.empty) return [];

    // Fetch all items inside each category
    const menuPromises = categorySnapshots.docs.map(async (catDoc) => {
      const catId = catDoc.id;
      const catName = catDoc.data().name?.trim() || catId;

      const itemsRef = collection(
        db,
        "restaurants",
        restaurantId,
        "categories",
        catId,
        "items"
      );
      const itemsSnap = await getDocs(itemsRef);

      return itemsSnap.docs.map((itemDoc) => ({
        id: itemDoc.id,
        categoryId: catId,
        categoryName: catName, // ✅ used for filtering by visible category
        ...itemDoc.data(),
      }));
    });

    const allItems = (await Promise.all(menuPromises)).flat();

    console.log(`📦 Loaded ${allItems.length} total items`);
    return allItems;
  } catch (error) {
    console.error("🔥 Error fetching all menu items:", error.message);
    throw error;
  }
};

/**
 * ✅ Fetch menu items by category
 */
export const fetchMenuByCategory = async (restaurantId, categoryId) => {
  if (!restaurantId || !categoryId)
    throw new Error("❌ restaurantId and categoryId are required.");

  try {
    const itemsRef = collection(
      db,
      "restaurants",
      restaurantId,
      "categories",
      categoryId,
      "items"
    );
    const itemsSnap = await getDocs(itemsRef);

    if (itemsSnap.empty) return [];

    return itemsSnap.docs.map((itemDoc) => ({
      id: itemDoc.id,
      categoryId,
      ...itemDoc.data(),
    }));
  } catch (error) {
    console.error("🔥 Error fetching menu by category:", error.message);
    throw error;
  }
};
