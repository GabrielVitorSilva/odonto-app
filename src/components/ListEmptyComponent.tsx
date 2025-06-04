import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];
type ListEmptyComponentProps = {
    iconName: IoniconsName;
    text: string;
}

export default function ListEmptyComponent({iconName, text}: ListEmptyComponentProps) {
  return (
    <View className="gap-4 mt-10 items-center">
      <Ionicons name={iconName} size={64} color={"#cecece" }/>
      <Text className="text-gray-400 text-lg">{text}</Text>
    </View>
  );
};
