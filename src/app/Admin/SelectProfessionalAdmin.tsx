import { useCallback, useState } from "react";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { PersonList } from "@/components/PersonList";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { treatmentsService } from "@/services/treatments";
import type { ProfessionalUser } from "@/services/types/treatments";
import { useAuth } from "@/contexts/AuthContext";
import { SingleSelectList } from "@/components/SingleSelectList";
import ListEmptyComponent from "@/components/ListEmptyComponent";

export default function SelectProfessionalAdmin() {
  const { setProfessionalSelected } = useAuth();
  
  const [selected, setSelected] = useState<{name: string; id: string}>({ name: "", id: "" });
  const navigation = useNavigation();

  const [professionals, setProfessionals] = useState<ProfessionalUser[]>([]);

  async function fetchProfessionals() {    
    const data = await treatmentsService.listProfessionals()
    setProfessionals(data);
  }

  useFocusEffect(
    useCallback(() => {
      fetchProfessionals();
    }, [])
  );

  function ProfessionalsEmpty() {
      return (
        <ListEmptyComponent
          iconName="medical"
          text="Não há funcionários vinculados ainda"
        />
      );
  }

  return (
    <View className="flex-1">
      <Header />
      <View className="flex-1 px-4 py-4">
        <Text className="text-center text-3xl font-semibold">
          Selecione o Odontólogo
        </Text>
        <Text className="text-app-blue font-semibold text-lg my-8">
          Lista de Odontólogos
        </Text>

        <View className="flex-1">
        <SingleSelectList
            list={professionals}
            selected={selected}
            setSelected={setSelected}
            ListEmptyComponent={ProfessionalsEmpty}
          />
        </View>
      </View>
      <Button
        className="mb-16"
        title="Selecionar"
        onPress={() => {
          const selectedClient = professionals.find(p => p.id === selected.id);
          setProfessionalSelected(selectedClient || null);
          navigation.navigate("SelectTreatmentAdmin")
        }}
      />
    </View>
  );
}
