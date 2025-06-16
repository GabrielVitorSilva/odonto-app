import React, { useCallback, useState } from "react";
import { Text, View, FlatList } from "react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import {
  consultationService,
  formatDateTime,
  ListAllConsultation,
} from "@/services/consultations";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { treatmentsService } from "@/services/treatments";
import Loading from "@/components/Loading";

type RouteParams = {
  name: string;
  professionalId: string;
};

export default function ViewProfessionalsProfile() {
  const [loading, setLoading] = useState(true);
  const [consultations, setConsultations] = useState<ListAllConsultation[]>([]);

  const route = useRoute();
  const { name, professionalId } = route.params as RouteParams;

  async function fetchProfConsultations() {
    try {
      setLoading(true);
      const response =
        await consultationService.listConsultationsByProfessional(
          professionalId
        );

      setConsultations(response.consultations);
    } finally {
      setLoading(false);
    }
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

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={consultations}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={ConsultationsEmpty}
          renderItem={({ item }) => {
            const { date, time } = formatDateTime(item.dateTime.toString());

            return (
              <Card
                name={item.treatmentName}
                upperText={`Paciente: ${"Ainda a fazer"}`}
                date={date}
                hour={time}
                status={item.status}
              />
            );
          }}
          className="w-full px-5 mx-auto"
        />
      )}
    </View>
  );
}
