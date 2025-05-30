import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface ButtonProps {
  title: string;
  titleColor?: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export function Button({
  title,
  titleColor = "white",
  onPress,
  disabled,
  className,
  isLoading,
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={`bg-app-blue py-4 px-10 rounded-full mt-16 w-96 mx-auto ${className || ""}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text 
        className={`text-${titleColor} text-center font-semibold ${isLoading ? 'opacity-0' : ''}`}
      >
        {title}
      </Text>
      {isLoading && (
        <ActivityIndicator
          size="small"
          color="#fff"
          className="absolute inset-0 flex items-center justify-center"
        />
      )}
    </TouchableOpacity>
  );
}
