import { useCallback, useState } from "react";
import Header from "@/components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { treatmentsService } from "@/services/treatments";
import type { ProfessionalUser } from "@/services/types/treatments";
import { useAuth } from "@/contexts/AuthContext";
import { SingleSelectList } from "@/components/SingleSelectList";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import Loading from "@/components/Loading";

export default function SelectProfessionalAdmin() {
  const { setProfessionalSelected } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [professionals, setProfessionals] = useState<ProfessionalUser[]>([]);

  async function fetchProfessionals() {
    try {
      setLoading(true);
      const data = await treatmentsService.listProfessionals();
      setProfessionals(data);
    } finally {
      setLoading(false);
    }
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

  function handleSelect(selectedClient: ProfessionalUser) {
      setProfessionalSelected(selectedClient || null);
      navigation.navigate("SelectTreatmentAdmin");
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
          {loading ? (
            <Loading />
          ) : (
            <SingleSelectList
              list={professionals}
              ListEmptyComponent={ProfessionalsEmpty}
              handlePress={handleSelect}
            />
          )}
        </View>
      </View>
    </View>
  );
}

