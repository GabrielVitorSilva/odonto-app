import React, { ComponentType } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

type SingleSelectListProps = {
  list: ArrayLike<any>;
  handlePress: (item: any) => void;
  ListEmptyComponent: ComponentType<any>;
};

export function SingleSelectList({
  list,
  handlePress,
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
            className={`py-5 px-8 rounded-xl`}
            onPress={() => {handlePress(item)}}
          >
            <Text className="text-xl">{item.name}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
} 