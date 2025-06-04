import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export type Person = {
  name: string;
};

type PersonListProps = {
  list: Person[];
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
      renderItem={({ item }) => (
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
      )}
    />
  );
}
