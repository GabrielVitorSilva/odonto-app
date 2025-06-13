import { useCallback, useState } from "react";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { PersonList } from "@/components/PersonList";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { treatmentsService } from "@/services/treatments";
import type { ClientUser, ProfessionalUser } from "@/services/types/treatments";
import { useAuth } from "@/contexts/AuthContext";
import { SingleSelectList } from "@/components/SingleSelectList";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import Loading from "@/components/Loading";

export default function SelectClientAdmin() {
  const { setClientSelected } = useAuth();

  const [selected, setSelected] = useState<{ name: string; id: string }>({
    name: "",
    id: "",
  });
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<ClientUser[]>([]);

  async function fetchClients() {
    try {
      setLoading(true);
      const data = await treatmentsService.listClients();
      setPatients(data);
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
          {Loading ? (
            <Loading />
          ) : (
            <SingleSelectList
              list={patients}
              selected={selected}
              setSelected={setSelected}
              ListEmptyComponent={PatientsEmpty}
            />
          )}
        </View>
      </View>
      <Button
        className="mb-16"
        title="Selecionar"
        onPress={() => {
          const selectedClient = patients.find((p) => p.id === selected.id);
          setClientSelected(selectedClient || null);
          navigation.navigate("SelectProfessionalAdmin");
        }}
      />
    </View>
  );
}

