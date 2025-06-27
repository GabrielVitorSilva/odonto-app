import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { Button } from "@/components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { treatmentsService, Treatment } from "@/services/treatments";
import Loading from "@/components/Loading";
import { useToast } from "@/contexts/ToastContext";

export default function TreatmentsAdmin() {
  const navigation = useNavigation();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  async function loadTreatments() {
    try {
      setLoading(true);
      const response = await treatmentsService.listAllTreatments();
      setTreatments(response.treatments);
    } catch (error: any) {
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
      <Header
        title="Tratamentos"
        handleGoBack={() => navigation.navigate("HomeAdmin")}
      />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={treatments}
          ListEmptyComponent={TreatmentsEmpty}
          renderItem={({ item }) => (
            <Card
              name={item.name}
              upperText={item.description}
              handlePress={() =>
                navigation.navigate("TreatmentPageAdmin", {
                  name: item.name,
                  treatment_id: item.id,
                  description: item.description,
                  professionals: item.professionals.map((p) => p.userId),
                })
              }
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          className="w-full px-5 mt-8 mx-auto"
        />
      )}

      <Button
        className="mb-4"
        title="Cadastrar Tratamento"
        onPress={() =>
          navigation.navigate("RegisterNewTreatment", { professionals: [] })
        }
      />
    </View>
  );
}
