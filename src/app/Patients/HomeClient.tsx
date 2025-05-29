import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

import Card from "@/components/Card";
import { Button } from "@/components/Button";

export default function HomeClient() {
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
      <View className="bg-app-blue pb-[150px] mb-[60px] relative">
        <View className="flex-row items-center justify-between p-5 relative">
          <TouchableOpacity>
            <Text className="text-white text-2xl w-40">Ajustes</Text>
          </TouchableOpacity>
          <Text className="text-white text-[30px] font-bold ">Perfil</Text>
          <TouchableOpacity>
            <Text className="text-white text-2xl text-right w-40">Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text className="text-center text-3xl font-semibold mb-[25px]">
        Victoria Robertson
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

      <Button title="Agendar Triagem" onPress={() => {}} />
    </View>
  );
}
