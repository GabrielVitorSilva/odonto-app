import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

type ProfileHeaderProps = {
  title: string;
  className?: string;
  handleGoBack?: (() => void) | null;
};

export default function ProfileHeader({
  title,
  className,
  handleGoBack
}: ProfileHeaderProps) {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        translucent
        backgroundColor="transparent"
      />
      <View style={{marginBottom: 65}} className={`bg-app-blue w-full pt-16 pb-[100px] px-5 ${className || ""}`}>
        <View className="flex-row w-full items-center justify-center">
          <TouchableOpacity
            className="w-13 flex-1"
            onPress={
              handleGoBack
                ? handleGoBack
                : () => {
                    navigation.goBack();
                  }
            }
          ><Ionicons color={"white"} size={32} name="arrow-back" /></TouchableOpacity>
          <Text className={`text-3xl font-semibold text-white`}>{title}</Text>
          <View className="w-13 flex-1"></View>
        </View>

        <View className="bg-white rounded-full  absolute bottom-[-4rem] self-center">
          <Ionicons name="person-circle-outline" style={{transform: 'scale(1.3)'}} size={135} color="#38ABE2" />
        </View>
      </View>
    </>
  );
}

