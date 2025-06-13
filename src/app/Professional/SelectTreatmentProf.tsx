import { View, FlatList, Text } from "react-native";
import Card from "@/components/Card";
import Header from "@/components/Header";
import { Button } from "@/components/Button";
import { useCallback, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Treatment, treatmentsService } from "@/services/treatments";
import { SingleSelectList } from "@/components/SingleSelectList";

export default function SelectTreatmentProf() {
  const { setTreatmentSelected } = useAuth();

  const [selected, setSelected] = useState<{ name: string; id: string }>({
    name: "",
    id: "",
  });
  const navigation = useNavigation();

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

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Tratamentos" />

      <SingleSelectList
        list={treatments}
        selected={selected}
        setSelected={setSelected}
      />

      <View className="mb-16">
        <Button
          className="mb-5"
          title="Selecionar"
          onPress={() => {
            const treatmentSelected = treatments.find(
              (p) => p.id === selected.id
            );
            setTreatmentSelected(treatmentSelected || null);
            navigation.navigate("SelectDateHourProf");
          }}
        />
      </View>
    </View>
  );
}
