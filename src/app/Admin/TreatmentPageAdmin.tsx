import Header from "@/components/Header";
import React, { useEffect } from "react";
import { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/Button";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import BottomDrawer from "@/components/BottomDrawer";
import { useRoute, useNavigation } from "@react-navigation/native";
import { treatmentsService } from "@/services/treatments";

type RouteParams = {
  name: string;
  description: string;
  treatment_id: string;
  professionals: string[];
};

type Professional = {
  id: string;
  name: string;
};

export default function TreatmentPageAdmin() {
  const route = useRoute();
  const { name, description, professionals, treatment_id  } = route.params as RouteParams;
  const [showDrawer, setShowDrawer] = useState(false);
  const [lastSelected, setLastSelected] = useState<Professional | null>(null);
  const [boundProfessionals, setBoundProfessionals] = useState<Professional[]>([]);

  const navigation = useNavigation();

  async function loadProfessionals() {
    try {
      const professionalsAvailable = await treatmentsService.listProfessionalAvailablesToTreatment(professionals);
      setBoundProfessionals(professionalsAvailable.map(userSelected => ({
        id: userSelected.user.id,
        name: userSelected.user.name
      })));
    } catch (error) {
      console.error('Erro ao carregar profissionais:', error);
    }
  }

  async function handleRemoveProfessional(userId: string, treatmentId: string) {    
    try {
      await treatmentsService.removeProfessionalFromTreatment(userId, treatmentId);
      setBoundProfessionals(prevState => prevState.filter(prof => prof.id !== userId));
    } catch (error) {
      console.error('Erro ao remover profissional:', error);
    }
  }

  useEffect(() => {
    loadProfessionals();
  }, []);

  const content = (
    <Text className="text-center">
      Deseja realmente desvincular{" "}
      <Text className="text-app-blue font-semibold">{lastSelected?.name}</Text> com{" "}
      <Text className="text-app-blue font-semibold">{name}</Text>?
    </Text>
  );

  function handlePress(professional: Professional) {
    setShowDrawer(true);
    setLastSelected(professional);
  }

  function handleDebindConfirmarion(){
    if (lastSelected) {
      handleRemoveProfessional(lastSelected.id, treatment_id);
      setShowDrawer(false);
    }
  }

  function ProfessionalsEmpty() {
    return (
      <ListEmptyComponent iconName="medical" text="Não há funcionários vinculados ainda" />
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
          renderItem={({ item }) => (
            <View className="py-5 px-8 rounded-xl flex-row justify-between">
              <Text className="text-xl">{item.name}</Text>
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
            navigation.navigate("BindProfessionalAdmin", {
              alreadyBound: boundProfessionals.map(p => p.id),
              returnTo: {
                screen: "TreatmentPageAdmin",
                params: {name, description, professionals}
              }
            });
          }}
          className="mb-14"
        />
      </View>
    </View>
  );
}
