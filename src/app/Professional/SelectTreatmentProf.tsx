import { View, FlatList, Text } from "react-native";
import Header from "@/components/Header";
import { useCallback, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Treatment, treatmentsService } from "@/services/treatments";
import { SingleSelectList } from "@/components/SingleSelectList";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import Loading from "@/components/Loading";

export default function SelectTreatmentProf() {
  const { profile, setTreatmentSelected } = useAuth();
  const { showToast } = useToast();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  async function loadTreatments() {
    try {
      setLoading(true);
      if (!profile?.user.profileData.id) {
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
        text="Não há tratamentos vinculados com você!"
      />
    );
  }

  function handleSelect(treatmentSelected: Treatment) {
    setTreatmentSelected(treatmentSelected || null);
    navigation.navigate("SelectDateHourProf");
  }

  return (
    <View className="flex-1 bg-gray-50">
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
              handlePress={handleSelect}
              ListEmptyComponent={TreatmentsEmpty}
            />
          )}
        </View>
      </View>
    </View>
  );
}

