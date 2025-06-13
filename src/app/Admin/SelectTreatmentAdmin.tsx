import { useCallback, useState } from "react";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { treatmentsService, type Treatment } from "@/services/treatments";
import { useAuth } from "@/contexts/AuthContext";
import { SingleSelectList } from "@/components/SingleSelectList";

export default function SelectTreatmentAdmin() {
  const { setTreatmentSelected } = useAuth();
  
  const [selected, setSelected] = useState<{name: string; id: string}>({ name: "", id: "" });
  const navigation = useNavigation();

  const [treatments, setTreatments] = useState<Treatment[]>([]);
  
  async function loadTreatments() {
    try {
      const response = await treatmentsService.listAllTreatments();
      setTreatments(response.treatments);
    } catch (error) {
      console.error('Erro ao carregar tratamentos:', error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadTreatments();
    }, [])
  );

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
        <SingleSelectList
            list={treatments}
            selected={selected}
            setSelected={setSelected}
          />
        </View>
      </View>
      <Button
        className="mb-16"
        title="Selecionar"
        onPress={() => {
          const treatmentSelected = treatments.find(p => p.id === selected.id);
          setTreatmentSelected(treatmentSelected || null);
          navigation.navigate("SelectDateHourAdmin")
        }}
      />
    </View>
  );
}
