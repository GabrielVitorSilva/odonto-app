import  React, { useCallback, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Header from "@/components/Header";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { ProfessionalUser } from "@/services/types/treatments";
import { treatmentsService } from "@/services/treatments";

export default function ProfessionalsPageAdmin() {
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

  function handlePress(name: string) {
    navigation.navigate("ViewProfessionalsProfile", { name });
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
      <View className="px-5">
        <Text className="text-center text-3xl font-semibold mb-5">
          Odontólogos
        </Text>
        <Text className="text-lg text-app-blue font-semibold mb-3">
          Lista de Odontólogos
        </Text>

        <FlatList
          data={professionals}
          ListEmptyComponent={ProfessionalsEmpty}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="py-5 px-8"
              onPress={() => handlePress(item.name)}
            >
              <Text className="text-lg">{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
