import React, { useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { treatmentsService } from "@/services/treatments";
import { consultationService } from "@/services/consultations";
import Loading from "@/components/Loading";

type RouteParams = {
  name: string;
  clientId: string;
};

type ConsultationDetails = {
  id: string;
  status: string;
  dateTime: Date;
  treatmentName: string;
  treatmentDescription: string;
};

export default function ViewPatientsProfile() {
  const [loading, setLoading] = useState(true);
  const [consultations, setConsultations] = useState<ConsultationDetails[]>([]);

  const route = useRoute();
  const { name, clientId } = route.params as RouteParams;

  async function fetchTreatmentInfo(treatmentId: string) {
    const response = await treatmentsService.getTreatment(treatmentId);
    return [response.name, response.description];
  }

  async function fetchProfConsultations() {
    try {
      setLoading(true);
      const response = await consultationService.listConsultationsByClient(
        clientId
      );

      const consultationsWithDetails = await Promise.all(
        response.consultations.map(async (consultation) => {
          const [treatmentName, treatmentDescription] =
            await fetchTreatmentInfo(consultation.treatmentId);
          return {
            id: consultation.id,
            status: consultation.status,
            dateTime: consultation.dateTime,
            treatmentName,
            treatmentDescription,
          };
        })
      );

      setConsultations(consultationsWithDetails);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProfConsultations();
    }, [])
  );

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

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={consultations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              name={item.treatmentName}
              upperText={`Procedimentos:`}
              lowerText={`${item.treatmentDescription}`}
              date={new Date(item.dateTime).toLocaleDateString("pt-BR")}
              hour={new Date(item.dateTime).toLocaleTimeString("pt-BR")}
              status={item.status}
            />
          )}
          className="w-full px-5 mx-auto"
        />
      )}
    </View>
  );
}

