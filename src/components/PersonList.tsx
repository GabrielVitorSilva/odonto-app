
import type { ProfessionalUser } from "@/services/types/treatments";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type PersonListProps = {
  list: ProfessionalUser[] | {name: string}[];
  multiselection?: boolean;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

export function PersonList({
  list,
  multiselection = false,
  selected,
  setSelected,
}: PersonListProps) {
  function handlePress(name: string) {
    selected.indexOf(name) != -1
      ? setSelected((prevSelected) =>
          prevSelected.filter((elem) => elem != name)
        )
      : selected.length > 0 && multiselection
      ? setSelected((prevSelected) => [...prevSelected, name])
      : setSelected([name]);
  }

  return (
    <FlatList
      data={list}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        if (!item?.name) {
          return null;
        }
        
        return (
          <TouchableOpacity
            className={`py-5 px-8 rounded-xl ${
              selected.indexOf(item.name) != -1 ? "bg-app-light-blue" : ""
            }`}
            onPress={() => {
              handlePress(item.name);
            }}
          >
            <Text className="text-xl">{item.name}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}
