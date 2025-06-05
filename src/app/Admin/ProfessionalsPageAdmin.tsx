import * as React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Header from "@/components/Header";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { useNavigation } from "@react-navigation/native";

export default function ProfessionalsPageAdmin() {
  const navigation = useNavigation();

  const professionals = [
    "Alberes",
    "Maria Santos",
    "Flávia Souza",
    "Thiago Monteiro",
    "Camila Duarte",
  ];

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
          Pacientes
        </Text>
        <Text className="text-lg text-app-blue font-semibold mb-3">
          Lista de Clientes
        </Text>

        <FlatList
          data={professionals}
          ListEmptyComponent={ProfessionalsEmpty}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="py-5 px-8"
              onPress={() => handlePress(item)}
            >
              <Text className="text-lg">{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
