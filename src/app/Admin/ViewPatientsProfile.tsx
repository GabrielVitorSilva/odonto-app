import React, { useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import {
  useRoute,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import {
  consultationService,
  formatDateTime,
  ListAllConsultation,
} from "@/services/consultations";
import Loading from "@/components/Loading";

type RouteParams = {
  name: string;
  clientId: string;
};

export default function ViewPatientsProfile() {
  const [loading, setLoading] = useState(true);
  const [consultations, setConsultations] = useState<ListAllConsultation[]>([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { name, clientId } = route.params as RouteParams;

  async function fetchPatientConsultations() {
    try {
      setLoading(true);
      const response = await consultationService.listConsultationsByClient(
        clientId
      );

      setConsultations(response.consultations);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPatientConsultations();
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
          renderItem={({ item }) => {
            const { date, time } = formatDateTime(item.dateTime.toString());
            return (
              <Card
                name={item.treatmentName}
                upperText={`Profissional: ${item.professionalName}`}
                date={date}
                hour={time}
                status={item.status}
                handlePress={() =>
                  navigation.navigate("ConsultationPageAdmin", {
                    id: item.id,
                    name: item.treatmentName,
                    dateTime: item.dateTime,
                    status: item.status,
                    patientName: item.clientName,
                    professionalName: item.professionalName,
                  })
                }
              />
            );
          }}
          className="w-full px-5 mx-auto"
        />
      )}
    </View>
  );
}

