import { View, Text, FlatList } from "react-native";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  consultationService,
  formatDateTime,
  ListAllConsultation,
} from "@/services/consultations";
import { useCallback, useState } from "react";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";

export default function ConsultationsPageProf() {
  const navigation = useNavigation();
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [consultations, setConsultations] = useState<ListAllConsultation[]>([]);

  async function fetchProfConsultations() {
    try {
      setLoading(true);
      if (!profile) {
        console.error("User profile is not available");
        return;
      }
      const response =
        await consultationService.listConsultationsByProfessional(
          profile?.user.profileData.id
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
    <View className="flex-1">
      <Header className="bg-app-blue" contentColor="white" />
      <View className="px-4 flex-1">
        <View className="border rounded-3xl border-gray-300 py-4 my-8 ">
          <Text className="text-app-blue font-semibold text-center">
            Atendimentos
          </Text>
        </View>

        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={consultations}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={ConsultationsEmpty}
            renderItem={({ item }) => {
              const { date, time } = formatDateTime(item.dateTime.toString());
              return (
                <Card
                  name={item.treatmentName}
                  upperText={`Paciente: ${item.clientName}`}
                  lowerText={`Profissional: ${item.professionalName}`}
                  date={date}
                  hour={time}
                  status={item.status}
                  handlePress={() =>
                    navigation.navigate("ConsultationPageProf", {
                      id: item.id,
                      name: item.treatmentName,
                      dateTime: item.dateTime,
                      status: item.status,
                      patientName: item.clientName,
                    })
                  }
                />
              );
            }}
            className="w-full px-5 mx-auto flex-1"
          />
        )}
      </View>

      <Button
        title="Agendar Consulta"
        onPress={() => {
          navigation.navigate("SelectPatientProf");
        }}
        className="mb-16"
      />
    </View>
  );
}

