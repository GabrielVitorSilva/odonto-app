import { View, TouchableOpacity, Text, Image } from "react-native";
import { Menu, menuItem } from "@/components/Menu";

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
      <View className="bg-app-blue pb-[150px] mb-[60px]">
        <View className="flex-row items-center justify-between p-5">
          <Text className="text-white text-4xl font-bold w-30"></Text>
          <Text className="text-white text-4xl font-bold ">Administrador</Text>
          <TouchableOpacity>
            <Text className="text-white text-2xl text-right w-30">Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text className="text-center text-3xl font-semibold mb-[25px]">
        Marina Dias
      </Text>

      <Menu items={menuItems} />
    </View>
  );
}
