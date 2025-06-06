import { View, Text, FlatList } from "react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
  name: string;
};

export default function ViewPatientsProfile() {
  const route = useRoute();
  const { name } = route.params as RouteParams;

  const consultations = [
    {
      name: "Clareamento",
      description: "lorem ipsum lorem ipsum lorem ipsum",
      date: "12/03/2025",
      hour: "12:00",
      status: "Pendente",
    },
    {
      name: "Clareamento",
      description: "lorem ipsum lorem ipsum lorem ipsum",
      date: "12/03/2025",
      hour: "12:00",
      status: "Confirmado",
    },
    {
      name: "Clareamento",
      description: "lorem ipsum lorem ipsum lorem ipsum",
      date: "12/03/2025",
      hour: "12:00",
      status: "Cancelado",
    },
  ];

  return (
    <View className="w-full">
      <Header
        className="bg-app-blue pb-[150px]"
        contentColor="white"
        title="Perfil"
      />
      <Text className="text-center text-3xl font-semibold my-[25px]">
        {name}
      </Text>

      <Text className="text-app-blue ml-5 mb-5 text-lg font-semibold">
        Lista de consultas
      </Text>

      <FlatList
        data={consultations}
        renderItem={({ item }) => (
          <Card
            name={item.name}
            upperText={`Procedimentos:`}
            lowerText={`${item.description}`}
            date={item.date}
            hour={item.hour}
            status={item.status}
          />
        )}
        className="w-full px-5 mx-auto"
      />
    </View>
  );
}
