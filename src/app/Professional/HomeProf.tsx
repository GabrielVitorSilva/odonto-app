import { View, Text } from "react-native";
import { Menu, menuItem } from "@/components/Menu";
import Header from "@/components/Header";

export default function HomeProf() {
  const menuItems: menuItem[] = [
    { title: "Consultas", icon: "folder" },
    { title: "Tratamentos", icon: "medkit" },
  ];

  return (
    <View>
      <Header
        title="Profissional"
        contentColor="white"
        className="bg-app-blue pb-[150px]"
        hasExit={true}
      />

      <Text className="text-center text-3xl font-semibold my-[25px]">
        Julio Guerra
      </Text>

      <Menu items={menuItems} />
    </View>
  );
}