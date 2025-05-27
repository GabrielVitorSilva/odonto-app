import { TouchableOpacity, Text } from "react-native";

export function Button({ title, onPress }: { title: string, onPress: () => void }) {
  return (
    <TouchableOpacity className="bg-app-blue py-4 px-10 rounded-full mt-16 w-96 mx-auto" onPress={onPress}>
      <Text className="text-white text-center font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}