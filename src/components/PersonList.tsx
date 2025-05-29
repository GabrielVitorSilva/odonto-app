import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export type Person = {
  name: string;
};

type PersonListProps = {
  list: Person[];
};

export function PersonList({ list }: PersonListProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <FlatList
      data={list}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          className={`py-5 px-8 rounded-xl ${
            index == selectedIndex ? "bg-app-light-blue" : ""
          }`}
          onPress={() => {
            setSelectedIndex(index);
          }}
        >
          <Text className="text-xl">{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
