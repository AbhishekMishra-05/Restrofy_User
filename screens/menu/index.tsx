import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  Alert,
  TextInput,
} from "react-native";
import Header from "../../components/cards/header";
import CategoryTabs from "../../components/cards/categorycard";
import MenuItemCard from "../../components/cards/MenuItemCard";
import FloatingCartBar from "../../components/buttons/floatingcart";

// Backend functions
import {
  fetchRestaurantDetails,
  fetchCategories,
  fetchAllMenuItems,
} from "../../backend/menu";

export default function UserMenuScreen({ route, navigation }) {
  const { qrData } = route.params;
  const [restaurantId, table] = qrData.split("|");

  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const restData = await fetchRestaurantDetails(restaurantId);
        setRestaurant(restData);

        const catList = await fetchCategories(restaurantId);
        setCategories(catList.map((c) => c.name));

        const allItems = await fetchAllMenuItems(restaurantId);
        setMenuItems(allItems);
      } catch (error) {
        Alert.alert("Error", "Failed to load menu data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const updateCart = (item, action) => {
    const exists = cart.find((x) => x.id === item.id);

    if (!exists && action === "add") {
      setCart([...cart, { ...item, quantity: 1 }]);
    } else if (exists && action === "add") {
      setCart(
        cart.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        )
      );
    } else if (exists && action === "remove") {
      if (exists.quantity === 1) {
        setCart(cart.filter((x) => x.id !== item.id));
      } else {
        setCart(
          cart.map((x) =>
            x.id === item.id ? { ...x, quantity: x.quantity - 1 } : x
          )
        );
      }
    }
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text style={{ color: "#FF6B00", marginTop: 8 }}>Loading Menu...</Text>
      </View>
    );

  if (!restaurant)
    return (
      <View style={styles.loader}>
        <Text style={{ color: "gray", fontSize: 16 }}>
          Restaurant not found. Please scan again.
        </Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Header
        title={restaurant?.name || "Restaurant"}
        subtitle={`Table ${table}`}
        navigation={navigation}
        showCart={true}
        cartCount={cart.length}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search food items..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          clearButtonMode="while-editing"
        />
      </View>

      <CategoryTabs
        categories={["All", ...categories]}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <FlatList
        data={menuItems.filter((item) => {
          const matchCategory =
            selectedCategory === "All" || item.categoryName?.toLowerCase().trim() === selectedCategory.toLowerCase().trim()

          const matchSearch = item.name
            .toLowerCase()
            .includes(searchText.toLowerCase());
          return matchCategory && matchSearch;
        })}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        extraData={cart} // Re-render when cart changes
        ListEmptyComponent={() => (
          <View style={styles.emptyList}>
            <Text style={{ color: "gray", fontSize: 16 }}>
              No items found.
            </Text>
          </View>
        )}
        renderItem={({ item }) => {
          const cartItem = cart.find((x) => x.id === item.id);
          return (
            <MenuItemCard
              item={item}
              cartItem={cartItem}
              onAdd={() => updateCart(item, "add")}
              onRemove={() => updateCart(item, "remove")}
            />
          );
        }}
      />

      <FloatingCartBar
        cart={cart}
        total={total}
        onPress={() =>
          navigation.navigate("Cart", {
            cart,
            restaurantId,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContent: {
    paddingBottom: 100, // To avoid floating cart bar overlap
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  searchContainer: {
  marginHorizontal: 27,
  marginVertical: 10,
  borderRadius: 11,
  borderWidth: 1.5,
  borderColor: "#fefdfcff",
  backgroundColor: "#d6d4d4ff",  // Ensure background is white for contrast
  paddingHorizontal: 70,
  paddingVertical: -2,
  overflow: "hidden",       // Make sure border is visible
  shadowColor: "#040403ff",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
  bottom: 25,
},
searchInput: {
  height: 40,
  fontSize: 16,
  padding: 0,               // Remove extra padding to fit container padding
  margin: 0,
  color: "#333",
},
});  