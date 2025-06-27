import { View, FlatList, Text } from "react-native";
import Header from "@/components/Header";
import { Treatment, treatmentsService } from "@/services/treatments";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import Loading from "@/components/Loading";
import NonPressableCard from "@/components/NonPressableCard";
import { useToast } from "@/contexts/ToastContext";

export default function TreatmentsPageProf() {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  async function loadTreatments() {
    try {
      setLoading(true);
      const response = await treatmentsService.listAllTreatments();
      setTreatments(response.treatments);
    } catch (error) {
      showToast("Erro ao carregar tratamentos", "error");
    } finally {
      setLoading(false);
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

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={treatments}
          ListEmptyComponent={TreatmentsEmpty}
          renderItem={({ item }) => (
            <NonPressableCard name={item.name} upperText={item.description} />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          className="w-full px-5 mt-8 mx-auto"
        />
      )}
    </View>
  );
}

