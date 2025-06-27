import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { Text, TouchableOpacity, View, StatusBar } from "react-native";

type HomeHeaderProps = {
  title: string;
  className?: string;
};

export default function HomeHeader({
  title,
  className,
}: HomeHeaderProps) {
  const { signOut } = useAuth();
  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        translucent
        backgroundColor="transparent"
      />
      <View style={{marginBottom: 65}} className={`bg-app-blue w-full pt-16 pb-[100px] px-5 ${className || ""}`}>
        <View className="flex-row w-full items-center justify-between">
          <View className="flex-1 w-13"></View>
          <Text className={`text-3xl font-semibold text-white`}>{title}</Text>
          <TouchableOpacity className="w-13 flex-1 items-end" onPress={() => signOut()}>
            <Text className={`text-xl text-white `}>Sair</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-full  absolute bottom-[-4rem] self-center">
          <Ionicons name="person-circle-outline" style={{transform: 'scale(1.3)'}} size={135} color="#38ABE2" />
        </View>
      </View>
    </>
  );
}

