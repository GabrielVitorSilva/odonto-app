import React, { useCallback, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Header from "@/components/Header";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { ProfessionalUser } from "@/services/types/treatments";
import { treatmentsService } from "@/services/treatments";
import Loading from "@/components/Loading";

export default function ProfessionalsPageAdmin() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
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

  function handlePress(name: string, professionalId: string) {
    navigation.navigate("ViewProfessionalsProfile", { name, professionalId });
  }

  function ProfessionalsEmpty() {
    return (
      <ListEmptyComponent
        iconName="medical"
        text="Não há funcionários vinculados ainda"
      />
    );
  }

  return (
    <View className="flex-1 ">
      <Header />
      <View className="px-5 flex-1">
        <Text className="text-center text-3xl font-semibold mb-5">
          Odontólogos
        </Text>
        <Text className="text-lg text-app-blue font-semibold mb-3">
          Lista de Odontólogos
        </Text>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={professionals}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={ProfessionalsEmpty}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="py-5 px-8"
                onPress={() => handlePress(item.name, item.professionalId)}
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
