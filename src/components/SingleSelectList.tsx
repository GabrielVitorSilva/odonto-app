import type { ProfessionalUser } from "@/services/types/treatments";
import React, { ComponentType } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

interface SelectedItem {
  name: string;
  id: string;
}

type SingleSelectListProps = {
  list: ProfessionalUser[] | {name: string; id: string}[];
  selected: SelectedItem | null;
  setSelected: React.Dispatch<React.SetStateAction<SelectedItem | null>>;
  ListEmptyComponent: ComponentType<any>;
};

export function SingleSelectList({
  list,
  selected,
  setSelected,
  ListEmptyComponent,
}: SingleSelectListProps) {
  return (
    <FlatList
      data={list}
      ListEmptyComponent={ListEmptyComponent}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        if (!item?.name) {
          return null;
        }
        
        return (
          <TouchableOpacity
            className={`py-5 px-8 rounded-xl ${
              selected?.id === item.id ? "bg-app-light-blue" : ""
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