import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type HeaderProps = {
  title?: string;
  contentColor?: string;
  className?: string;
  hasExit?: boolean;
};

export default function Header({
  title,
  contentColor = "black",
  className,
  hasExit = false,
}: HeaderProps) {
  const font = `text-${contentColor}`;
  return (
    <View
      className={`flex-row items-center justify-between w-ful py-10 px-5 ${
        className || ""
      }`}
    >
      {!hasExit ? (
        <TouchableOpacity className="w-13">
          <Ionicons color={contentColor} size={32} name="arrow-back" />
        </TouchableOpacity>
      ) : (
        <Text className="w-13"></Text>
      )}

      {title && (
        <Text className={`text-3xl font-semibold ${font}`}>{title}</Text>
      )}

      <TouchableOpacity className="w-13">
        <Text className={`text-xl ${font} `}>{hasExit && "Sair"}</Text>
      </TouchableOpacity>
    </View>
  );
}
