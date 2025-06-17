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
import Loading from "@/components/Loading";

export default function SelectProfessionalAdmin() {
  const { setProfessionalSelected } = useAuth();
  const [noSelected, setNoSelected] = useState(false);
  const [selected, setSelected] = useState<{ name: string; id: string } | null>(null);
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

  function handleSelect() {
    if (selected === null) {
      setNoSelected(true);
    } else {
      setNoSelected(false);
      const selectedClient = professionals.find((p) => p.id === selected.id);
      setProfessionalSelected(selectedClient || null);
      navigation.navigate("SelectTreatmentAdmin");
    }
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
              selected={selected}
              setSelected={setSelected}
              ListEmptyComponent={ProfessionalsEmpty}
            />
          )}
        </View>
      </View>
      <View className="mb-4">
      <Button
        title="Selecionar"
        onPress={handleSelect}
      />
      {noSelected && (
          <Text className="text-lg text-app-red text-center mt-3">
            Selecione pelo menos um Odontólogo
          </Text>
        )}
      </View>
    </View>
  );
}

