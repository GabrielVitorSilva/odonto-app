import { View, FlatList } from "react-native";
import Card from "@/components/Card";
import Header from "@/components/Header";

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
      description:
        "Procedimentos: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      color: "bg-orange-100",
    },
    {
      id: 2,
      title: "Limpeza",
      description:
        "Procedimentos: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      color: "bg-gray-800",
    },
    {
      id: 3,
      title: "Implante",
      description:
        "Procedimentos: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      color: "bg-pink-100",
    },
    {
      id: 4,
      title: "Manutenção",
      description:
        "Procedimentos: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      color: "bg-blue-100",
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Tratamentos" />

      <FlatList
        data={treatments}
        renderItem={({ item }) => (
          <Card name={item.title} upperText={item.description} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        className="w-full px-5 mt-8 mx-auto"
      />
    </View>
  );
}
