import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button({ title, onPress, disabled, className }: ButtonProps) {
  return (
    <TouchableOpacity 
      className={`bg-app-blue py-4 px-10 rounded-full mt-16 w-96 mx-auto ${className || ''}`} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text className="text-white text-center font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}