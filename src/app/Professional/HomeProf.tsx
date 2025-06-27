import { View, Text } from "react-native";
import { Menu, menuItem } from "@/components/Menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import HomeHeader from "@/components/HomeHeader";

export default function HomeProf() {
  const navigation = useNavigation();
  const { profile } = useAuth();
  const menuItems: menuItem[] = [
    {
      title: "Consultas",
      icon: "folder",
      handlePress: () => navigation.navigate("ConsultationsPageProf"),
    },
    {
      title: "Tratamentos",
      icon: "medkit",
      handlePress: () => navigation.navigate("TreatmentsProf"),
    },
  ];

  return (
    <View className="flex-1">
      <HomeHeader title="Profissional" />

      <Text className="text-center text-neutral-700 text-3xl font-semibold">
        {profile?.user.User.name || "Bem-vindo(a)!"}
      </Text>

      <Menu items={menuItems} />
    </View>
  );
}
