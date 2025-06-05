import ListEmptyComponent from "@/components/ListEmptyComponent";
import * as React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Header from "@/components/Header";
import { useNavigation } from "@react-navigation/native";

export default function PatientsPage() {
  const navigation = useNavigation();

  const patients = ["Victoria Robertson"];

  function handlePress(name: string) {
    navigation.navigate("ViewPatientsProfile", { name });
  }

  function PatientsEmpty() {
    return (
      <ListEmptyComponent iconName="people" text="Não há pacientes ainda" />
    );
  }

  return (
    <View className="flex-1 ">
      <Header />
      <View className="px-5">
        <Text className="text-center text-3xl font-semibold mb-5">Pacientes</Text>
        <Text className="text-lg text-app-blue font-semibold mb-3">
          Lista de Clientes
        </Text>

        <FlatList
          data={patients}
          ListEmptyComponent={PatientsEmpty}
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
