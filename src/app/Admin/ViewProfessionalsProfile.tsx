import React, { useCallback, useState } from "react";
import { Text, View, FlatList } from "react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { consultationService } from "@/services/consultations";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { treatmentsService } from "@/services/treatments";

type RouteParams = {
  name: string;
  professionalId: string;
};

type ConsultationDetails = {
  id: string;
  status: string;
  dateTime: Date;
  treatmentName: string;
};

export default function ViewProfessionalsProfile() {
  const [consultations, setConsultations] = useState<ConsultationDetails[]>([]);

  const route = useRoute();
  const { name, professionalId } = route.params as RouteParams;

  async function fetchTreatmentName(treatmentId: string) {
    const response = await treatmentsService.getTreatment(treatmentId);
    return response.name;
  }

  async function fetchProfConsultations() {
    const response = await consultationService.listConsultationsByProfessional(
      professionalId
    );

    const consultationsWithDetails = await Promise.all(
      response.consultations.map(async (consultation) => {
        const treatmentName = await fetchTreatmentName(
          consultation.treatmentId
        );

        return {
          id: consultation.id,
          status: consultation.status,
          dateTime: consultation.dateTime,
          treatmentName,
        };
      })
    );

    setConsultations(consultationsWithDetails);
  }

  useFocusEffect(
    useCallback(() => {
      fetchProfConsultations();
    }, [])
  );

  function ConsultationsEmpty() {
    return (
      <ListEmptyComponent iconName="clipboard" text="Não há consultas ainda" />
    );
  }

  return (
    <View className="w-full">
      <Header
        className="bg-app-blue pb-[150px]"
        contentColor="white"
        title="Perfil"
      />
      <Text className="text-center text-3xl font-semibold my-[25px]">
        {name}
      </Text>

      <Text className="text-app-blue ml-5 mb-5 text-lg font-semibold">
        Lista de consultas
      </Text>

      <FlatList
        data={consultations}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={ConsultationsEmpty}
        renderItem={({ item }) => (
          <Card
            name={item.treatmentName}
            upperText={`Paciente: ${"Ainda a fazer"}`}
            date={new Date(item.dateTime).toLocaleDateString("pt-BR")}
            hour={new Date(item.dateTime).toLocaleTimeString("pt-BR")}
            status={item.status}
          />
        )}
        className="w-full px-5 mx-auto"
      />
    </View>
  );
}
