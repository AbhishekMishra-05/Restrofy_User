// components/CategoryTabs.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function CategoryTabs({ 
  categories = [], 
  selectedCategory, 
  onSelectCategory 
}) {
  return (
    <View style={styles.wrapper}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              selectedCategory === cat && styles.categoryActive,
            ]}
            onPress={() => onSelectCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && { color: "#fff" },
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  categoryChip: {
    borderWidth: 1,
    borderColor: "#6c660dff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#f9f3f3ff",
  },
  categoryActive: {
    backgroundColor: "#765c05ff",
    borderColor: "#e3b920ff",
  },
  categoryText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
});  