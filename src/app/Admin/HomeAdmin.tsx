import { View, Text } from "react-native";
import { Menu, menuItem } from "@/components/Menu";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/Header";

export default function HomeAdmin() {
  const navigation = useNavigation();

  const menuItems: menuItem[] = [
    {
      title: "Consultas",
      icon: "folder",
      handlePress: () => navigation.navigate("ConsultationsPageAdmin"),
    },
    {
      title: "Tratamentos",
      icon: "medkit",
      handlePress: () => navigation.navigate("TreatmentsAdmin"),
    },
    {
      title: "Cadastrar usuário",
      icon: "person-add",
      handlePress: () => {
        navigation.navigate("RegisterAnotherUser");
      },
    },
    {
      title: "Odontólogos",
      icon: "medical",
      handlePress: () => navigation.navigate("ProfessionalsPageAdmin"),
    },
    {
      title: "Clientes",
      icon: "person",
      handlePress: () => navigation.navigate("PatientsPageAdmin"),
    },
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
