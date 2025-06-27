import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

type HeaderProps = {
  title?: string;
  contentColor?: string;
  className?: string;
  hasExit?: boolean;
  handleGoBack?: (() => void) | null;
};

export default function Header({
  title,
  contentColor = "black",
  className,
  hasExit = false,
  handleGoBack = null,
}: HeaderProps) {
  const navigation = useNavigation();

  const font = `text-${contentColor}`;
  return (
    <>
      <StatusBar
        barStyle={contentColor == "black" ? "dark-content" : "light-content"}
        translucent
        backgroundColor="transparent"
      />
      <View
        className={`flex-row items-center justify-between w-ful pb-5 pt-20 px-5 ${
          className || ""
        }`}
      >
          <TouchableOpacity
            className="w-13 flex-1"
            onPress={
              handleGoBack
                ? handleGoBack
                : () => {
                    navigation.goBack();
                  }
            }
          >
            <Ionicons color={contentColor} size={32} name="arrow-back" />
          </TouchableOpacity>
        

        {title && (
          <Text className={`text-3xl font-semibold ${font}`}>{title}</Text>
        )}

        <View className="w-13 flex-1"></View>
      </View>
    </>
  );
}
