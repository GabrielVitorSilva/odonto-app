import { useCallback, useState } from "react";
import Header from "@/components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { treatmentsService } from "@/services/treatments";
import type { ClientUser } from "@/services/types/treatments";
import { useAuth } from "@/contexts/AuthContext";
import { SingleSelectList } from "@/components/SingleSelectList";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import Loading from "@/components/Loading";
import { useToast } from "@/contexts/ToastContext";

export default function SelectClientAdmin() {
  const { setClientSelected } = useAuth();
  const { showToast } = useToast();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<ClientUser[]>([]);

  async function fetchClients() {
    try {
      setLoading(true);
      const data = await treatmentsService.listClients();
      setPatients(data);
    } catch (error: any) {
      showToast("Erro ao carregar clientes", "error");
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
    navigation.navigate("SelectProfessionalAdmin");
  }

  return (
    <View className="flex-1">
      <Header />
      <View className="flex-1 px-4 py-4">
        <Text className="text-center text-3xl font-semibold">
          Selecione o Cliente
        </Text>
        <Text className="text-app-blue font-semibold text-lg my-8">
          Lista de Clientes
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

