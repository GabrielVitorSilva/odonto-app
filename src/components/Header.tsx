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
  const { signOut } = useAuth();

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
        {!hasExit ? (
          <TouchableOpacity
            className="w-13"
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
        ) : (
          <Text className="w-13"></Text>
        )}

        {title && (
          <Text className={`text-3xl font-semibold ${font}`}>{title}</Text>
        )}

        <TouchableOpacity className="w-13" onPress={() => signOut()}>
          <Text className={`text-xl ${font} `}>{hasExit && "Sair"}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
