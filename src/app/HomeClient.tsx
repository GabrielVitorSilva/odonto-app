import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

import Card from "@/components/Card";
import { Button } from "@/components/Button";

export default function HomeClient() {
  const consultas = [
    {
      name: "Clareamento",
      description: "lorem ipsum lorem ipsum lorem ipsum",
      date: "12/03/2025",
      status: "Pendente",
    },
    {
      name: "Clareamento",
      description: "lorem ipsum lorem ipsum lorem ipsum",
      date: "12/03/2025",
      status: "Confirmado",
    },
    {
      name: "Clareamento",
      description: "lorem ipsum lorem ipsum lorem ipsum",
      date: "12/03/2025",
      status: "Cancelado",
    },
  ];

  return (
    <View className="w-full">
      <View className="bg-[#38ABE2] pb-[150px] mb-[60px] relative">
        <View className="flex-row items-center justify-between p-5">
          <TouchableOpacity>
            <Text className="text-white w-15 text-2xl">Ajustes</Text>
          </TouchableOpacity>
          <Text className="text-white text-[30px] font-bold">Perfil</Text>
          <TouchableOpacity>
            <Text className="text-white w-15 text-2xl">Sair</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../assets/tsunami.jpg")}
          className="w-40 h-40 rounded-full border-[4px] border-white self-center absolute -bottom-[45px]"
        />
      </View>

      <Text className="text-center text-[20px] font-bold mb-[25px]">
        Victoria Robertson
      </Text>

      <Text className="text-[#38ABE2] ml-5 mb-5 text-[16px] font-bold">
        Lista de consultas
      </Text>

      <FlatList
        data={consultas}
        renderItem={({ item }) => (
          <Card
            name={item.name}
            description={item.description}
            date={item.date}
            status={item.status}
          />
        )}
        className="w-full px-5 mx-auto"
      />

      <Button title="Agendar Triagem" onPress={() => {}} />
    </View>
  );
}
