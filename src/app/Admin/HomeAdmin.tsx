import { View, Text } from "react-native";
import { Menu, menuItem } from "@/components/Menu";
import Header from "@/components/Header";

export default function HomeAdmin() {
  const menuItems: menuItem[] = [
    { title: "Consultas", icon: "folder" },
    { title: "Tratamentos", icon: "medkit" },
    { title: "Cadastrar usuário", icon: "person-add" },
    { title: "Odontólogos", icon: "medical" },
    { title: "Clientes", icon: "person" },
  ];

  return (
    <View>
      <Header
        title="Administrador"
        contentColor="white"
        className="bg-app-blue pb-[150px]"
        hasExit={true}
      />

      <Text className="text-center text-3xl font-semibold my-[25px]">
        Marina Dias
      </Text>

      <Menu items={menuItems} />
    </View>
  );
}
