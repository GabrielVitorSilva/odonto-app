import { View, Text, TouchableOpacity } from "react-native";
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
      <View className="p-5">
        <Text className="text-app-blue mb-5 text-center text-lg font-semibold pb-2 border-b-hairline border-b-gray-300">
          Menu
        </Text>

        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row gap-6 items-center mb-3"
            onPress={item.handlePress}
          >
            <Ionicons name={item.icon} size={48} color="black" />
            <Text className="font-bold">{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
