import { useCallback, useState } from "react";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { treatmentsService, type Treatment } from "@/services/treatments";
import { useAuth } from "@/contexts/AuthContext";
import { SingleSelectList } from "@/components/SingleSelectList";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import Loading from "@/components/Loading";
import { useToast } from "@/contexts/ToastContext";

export default function SelectTreatmentAdmin() {
  const { professionalSelected, setTreatmentSelected } = useAuth();
  const [noSelected, setNoSelected] = useState(false);
  const [selected, setSelected] = useState<{ name: string; id: string } | null>(
    null
  );
  const navigation = useNavigation();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  async function loadTreatments() {
    try {
      setLoading(true);
      if (!professionalSelected?.professionalId) {
        showToast("Nenhum profissional selecionado.", "error");
        return;
      }
      const response = await treatmentsService.listAllTreatments();
      setTreatments(response.treatments);
    } catch (error) {
      console.error("Erro ao carregar tratamentos:", error);
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
        text="Não há tratamentos vinculados com o funcionário"
      />
    );
  }

  function handleSelect() {
    if (selected === null) {
      setNoSelected(true);
    } else {
      setNoSelected(false);
      const treatmentSelected = treatments.find((p) => p.id === selected.id);
      setTreatmentSelected(treatmentSelected || null);
      navigation.navigate("SelectDateHourAdmin");
    }
  }

  return (
    <View className="flex-1">
      <Header />
      <View className="flex-1 px-4 py-4">
        <Text className="text-center text-3xl font-semibold">
          Selecione o Tratamento
        </Text>
        <Text className="text-app-blue font-semibold text-lg my-8">
          Lista de Tratamentos
        </Text>

        <View className="flex-1">
          {loading ? (
            <Loading />
          ) : (
            <SingleSelectList
              list={treatments}
              selected={selected}
              setSelected={setSelected}
              ListEmptyComponent={TreatmentsEmpty}
            />
          )}
        </View>
      </View>

      <View className="mb-4">
        <Button title="Selecionar" onPress={handleSelect} />
        {noSelected && (
          <Text className="text-lg text-app-red text-center mt-3">
            Selecione pelo menos um tratamento
          </Text>
        )}
      </View>
    </View>
  );
}

