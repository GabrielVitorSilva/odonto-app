import { View, Text } from "react-native";
import { Menu, menuItem } from "@/components/Menu";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function HomeProf() {
  const navigation = useNavigation();
  const {profile} = useAuth()
  const menuItems: menuItem[] = [
    { 
      title: "Consultas", 
      icon: "folder", 
      handlePress: () => navigation.navigate("ConsultationsPageProf")},
    { 
      title: "Tratamentos", 
      icon: "medkit", 
      handlePress: () => navigation.navigate
      ("TreatmentsProf") },
  ];

  return (
    <View className="flex-1">
      <Header
        title="Profissional"
        contentColor="white"
        className="bg-app-blue pb-24"
        hasExit={true}
      />

      <Text className="text-center text-3xl font-semibold my-[25px]">
        {profile?.user.name || "Bem-vindo(a)!"}
      </Text>

      <Menu items={menuItems} />
    </View>
  );
}