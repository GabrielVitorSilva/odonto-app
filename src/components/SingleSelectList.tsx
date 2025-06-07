import type { ProfessionalUser } from "@/services/types/treatments";
import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

interface SelectedItem {
  name: string;
  id: string;
}

type SingleSelectListProps = {
  list: ProfessionalUser[] | {name: string; id: string}[];
  selected: SelectedItem;
  setSelected: React.Dispatch<React.SetStateAction<SelectedItem>>;
};

export function SingleSelectList({
  list,
  selected,
  setSelected,
}: SingleSelectListProps) {
  return (
    <FlatList
      data={list}
      renderItem={({ item }) => {
        if (!item?.name) {
          return null;
        }
        
        return (
          <TouchableOpacity
            className={`py-5 px-8 rounded-xl ${
              selected.name === item.name ? "bg-app-light-blue" : ""
            }`}
            onPress={() => {
              setSelected({ name: item.name, id: item.id });
            }}
          >
            <Text className="text-xl">{item.name}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
} 