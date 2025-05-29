import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Card from "@/components/Card";

interface Treatment {
  id: number;
  title: string;
  description: string;
  color: string;
}

export default function TreatmentsScreen() {
  const treatments: Treatment[] = [
    {
      id: 1,
      title: "Clareamento",
      description: "Procedimentos: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      color: "bg-orange-100"
    },
    {
      id: 2,
      title: "Limpeza",
      description: "Procedimentos: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      color: "bg-gray-800"
    },
    {
      id: 3,
      title: "Implante",
      description: "Procedimentos: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      color: "bg-pink-100"
    },
    {
      id: 4,
      title: "Manutenção",
      description: "Procedimentos: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      color: "bg-blue-100"
    }
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white pt-12 pb-4 px-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="chevron-back" size={24} color="#374151" />
            <Text className="text-gray-700 ml-1">Voltar</Text>
          </TouchableOpacity>
          
          <Text className="text-xl font-semibold text-gray-800">
            Tratamentos
          </Text>
          
          <View className="w-16" />
        </View>
      </View>

      <FlatList
        data={treatments}
        renderItem={({item}) => <Card name={item.title} upperText={item.description} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        className="w-full px-5 mt-8 mx-auto"
      />
    </View>
  );
}