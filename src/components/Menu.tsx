import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

export type menuItem = {
  title: string;
  icon: IoniconsName;
  handlePress: () => void;
};

type MenuProps = {
  items: menuItem[];
};

export function Menu({ items }: MenuProps) {
  return (
    <>
      <View className="flex-1 p-5">
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              className="flex-row gap-6 items-center mb-3"
              onPress={item.handlePress}
            >
              <Ionicons name={item.icon} size={48} color="#404040" />
              <Text className="font-bold text-neutral-700">{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}
