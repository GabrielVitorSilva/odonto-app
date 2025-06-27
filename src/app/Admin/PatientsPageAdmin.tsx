import ListEmptyComponent from "@/components/ListEmptyComponent";
import React, { useCallback, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Header from "@/components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { ClientUser } from "@/services/types/treatments";
import { treatmentsService } from "@/services/treatments";
import Loading from "@/components/Loading";
import { useToast } from "@/contexts/ToastContext";

export default function PatientsPage() {
  const navigation = useNavigation();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState<ClientUser[]>([]);

  async function fetchClients() {
    try {
      setLoading(true);
      const data = await treatmentsService.listClients();
      setPatients(data);
    } catch (error: any) {
      showToast("Erro ao carregar pacientes", "error");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchClients();
    }, [])
  );
  function handlePress(name: string, clientId: string) {
    navigation.navigate("ViewPatientsProfile", { name, clientId });
  }

  function PatientsEmpty() {
    return (
      <ListEmptyComponent iconName="people" text="Não há pacientes ainda" />
    );
  }

  return (
    <View className="flex-1 ">
      <Header />
      <View className="flex-1 px-5">
        <Text className="text-center text-3xl font-semibold mb-5">
          Pacientes
        </Text>
        <Text className="text-lg text-app-blue font-semibold mb-3">
          Lista de Clientes
        </Text>

        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={patients}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={PatientsEmpty}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="py-5 px-8"
                onPress={() => handlePress(item.name, item.clientId)}
              >
                <Text className="text-lg">{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}
