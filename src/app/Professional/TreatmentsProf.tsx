import { View, FlatList, Text } from "react-native";
import Card from "@/components/Card";
import Header from "@/components/Header";
import { Treatment, treatmentsService } from "@/services/treatments";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ListEmptyComponent from "@/components/ListEmptyComponent";

export default function TreatmentsPageProf() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  async function loadTreatments() {
    try {
      const response = await treatmentsService.listAllTreatments();
      setTreatments(response.treatments);
    } catch (error) {
      console.error("Erro ao carregar tratamentos:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadTreatments();
    }, [])
  );

  function TreatmentsEmpty() {
    return (
      <ListEmptyComponent
        iconName="medkit"
        text="Não há tratamentos cadastrados ainda"
      />
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Tratamentos" />

      <FlatList
        data={treatments}
        ListEmptyComponent={TreatmentsEmpty}
        renderItem={({ item }) => (
          <Card name={item.name} upperText={item.description} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        className="w-full px-5 mt-8 mx-auto"
      />
    </View>
  );
}
