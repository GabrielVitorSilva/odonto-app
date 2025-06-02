import * as React from "react";
import { FlatList, View } from "react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import { useNavigation } from "@react-navigation/native";

export default function TreatmentsAdmin() {
  const navigation = useNavigation();

  const treatments = [
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
          <Card
            name={item.title}
            upperText={item.description}
            handlePress={() =>
              navigation.navigate("TreatmentPageAdmin", {
                name: item.title,
                description: item.description,
              })
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        className="w-full px-5 mt-8 mx-auto"
      />
    </View>
  );
}
