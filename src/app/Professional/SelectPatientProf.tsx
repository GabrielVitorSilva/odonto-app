import { useCallback, useState } from "react";
import Header from "@/components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { treatmentsService } from "@/services/treatments";
import { ClientUser } from "@/services/types/treatments";
import { SingleSelectList } from "@/components/SingleSelectList";
import { useAuth } from "@/contexts/AuthContext";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import Loading from "@/components/Loading";
import { useToast } from "@/contexts/ToastContext";

export default function SelectPatientProf() {
  const { setClientSelected } = useAuth();
  const navigation = useNavigation();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<ClientUser[]>([]);

  async function fetchClients() {
    try {
      setLoading(true);
      const data = await treatmentsService.listClients();
      setPatients(data);
    } catch (error: any) {
      showToast("Erro ao carregar consultas", "error");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchClients();
    }, [])
  );

  function PatientsEmpty() {
    return (
      <ListEmptyComponent iconName="people" text="Não há pacientes ainda" />
    );
  }

  function handleSelect(selectedClient: ClientUser) {
    setClientSelected(selectedClient || null);
    navigation.navigate("SelectTreatmentProf");
  }

  return (
    <View className="flex-1">
      <Header />
      <View className="flex-1 px-4 py-4">
        <Text className="text-center text-3xl font-semibold">
          Selecione o Paciente
        </Text>
        <Text className="text-app-blue font-semibold text-lg my-8">
          Lista de Pacientes
        </Text>

        <View className="flex-1">
          {loading ? (
            <Loading />
          ) : (
            <SingleSelectList
              list={patients}
              handlePress={handleSelect}
              ListEmptyComponent={PatientsEmpty}
            />
          )}
        </View>
      </View>
    </View>
  );
}

