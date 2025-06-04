import Header from "@/components/Header";
import * as React from "react";
import { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/Button";
import BottomDrawer from "@/components/BottomDrawer";
import { useRoute, useNavigation } from "@react-navigation/native";

type RouteParams = {
  name: string;
  description: string;
  professionals: string[];
};

export default function TreatmentPageAdmin() {
  const route = useRoute();
  const { name, description, professionals } = route.params as RouteParams;
  
  const [showDrawer, setShowDrawer] = useState(false);
  const [lastSelected, setLastSelected] = useState("");
  const [boundProfessionals, setBoundProfessionals] = useState(professionals);

  const navigation = useNavigation();

  const content = (
    <Text className="text-center">
      Deseja realmente desvincular{" "}
      <Text className="text-app-blue font-semibold">{lastSelected}</Text> com{" "}
      <Text className="text-app-blue font-semibold">{name}</Text>?
    </Text>
  );

  function handlePress(name: string) {
    setShowDrawer(true);
    setLastSelected(name);
  }

  function handleDebindConfirmarion(){
    setBoundProfessionals(prevState => prevState.filter(name => name != lastSelected));
    setShowDrawer(false);
  }

  function ProfessionalsEmpty() {
    return (
      <View className="gap-4 mt-10 items-center">
        <Ionicons className="" name="medical" size={64} color={"#cecece"} />
        <Text className="text-gray-400 text-lg">Não há Funcionários vinculados</Text>
      </View>
    )
  }

  return (
    <View className="flex-1">
      <Header className="bg-app-blue" contentColor="white" handleGoBack={() => navigation.navigate("TreatmentsAdmin")} />
      <View className="flex-1 px-4 py-4">
        <Text className="text-3xl font-semibold mb-4">{name}</Text>
        <Text>{description}</Text>

        <Text className="mt-10 text-2xl font-semibold">
          Funcionários Vinculados
        </Text>
        <FlatList
          data={boundProfessionals}
          ListEmptyComponent={ProfessionalsEmpty}
          renderItem={({ item, index }) => (
            <View className="py-5 px-8 rounded-xl flex-row justify-between">
              <Text className="text-xl">{item}</Text>
              <TouchableOpacity onPress={() => handlePress(item)}>
                <Ionicons
                  name="remove-circle-outline"
                  size={28}
                  color={"black"}
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {showDrawer && (
          <BottomDrawer
            content={content}
            title="Desvincular funcionário"
            buttonTitle="Desvincular agora"
            handlePress={handleDebindConfirmarion}
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
          />
        )}
        <Button
          title="Vincular Odontologo"
          onPress={() => {
            navigation.navigate("BindProfessionalAdmin", {alreadyBound: boundProfessionals, returnTo: {screen: "TreatmentPageAdmin", params: {name, description, professionals}}});
          }}
          className="mb-14"
        />
      </View>
    </View>
  );
}
