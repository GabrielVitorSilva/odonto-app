import * as React from "react";
import { Text, View, FlatList } from "react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
  name: string;
};

export default function ViewProfessionalsProfile() {
  const route = useRoute();
  const { name } = route.params as RouteParams;

  const consultations = [
    {
      id: 1,
      name: "Clareamento",
      patient: "Victoria Robertson",
      status: "Pendente",
      date: "12/03/2025",
      hour: "12:00",
    },
    {
      id: 2,
      name: "Clareamento",
      patient: "Lucas",
      status: "Confirmado",
      date: "12/03/2025",
      hour: "12:00",
    },
    {
      id: 3,
      name: "Clareamento",
      patient: "Marcelo",
      status: "Cancelado",
      date: "12/03/2025",
      hour: "12:00",
    },
    {
      id: 4,
      name: "Clareamento",
      patient: "Gabriel Vitor",
      status: "Finalizado",
      date: "12/03/2025",
      hour: "12:00",
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
            upperText={`Paciente: ${item.patient}`}
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
