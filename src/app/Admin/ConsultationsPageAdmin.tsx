import { View, Text, FlatList } from "react-native";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { consultationService, Consultation } from "@/services/consultations";
import { useCallback, useState } from "react";
import { treatmentsService } from "@/services/treatments";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";

type ConsultationsWithDetails = Consultation & {
  treatmentName: string;
  patientName: string;
  professionalName: string;
};

export default function ConsultationsPageAdmin() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [consultations, setConsultations] = useState<
    ConsultationsWithDetails[]
  >([]);
  const navigation = useNavigation();

  async function fetchTreatmentInfo(treatmentId: string) {
    const response = await treatmentsService.getTreatment(treatmentId);
    return response.name;
  }

  async function loadConsultations() {
    try {
      setLoading(true);
      const response = await consultationService.listAllConsultations(
        profile?.user.id
      );

      const consultationsWithDetails = await Promise.all(
        response.consultations.map(async (consultation) => {
          const treatmentName = await fetchTreatmentInfo(
            consultation.treatmentId
          );

          return {
            ...consultation,
            treatmentName,
            patientName: "",
            professionalName: "",
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
      loadConsultations();
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
            renderItem={({ item }) => (
              <Card
                name={item.treatmentName}
                upperText={`Paciente: ${item.patientName}`}
                lowerText={`Profissional: ${item.professionalName}`}
                date={new Date(item.dateTime).toLocaleDateString("pt-BR")}
                hour={new Date(item.dateTime).toLocaleTimeString("pt-BR")}
                status={item.status}
                handlePress={() =>
                  navigation.navigate("ConsultationPageAdmin", {
                    name: item.treatmentName,
                    dateTime: item.dateTime,
                    status: item.status,
                    patientName: item.patientName,
                    professionalName: item.professionalName,
                  })
                }
              />
            )}
            className="w-full px-5 mx-auto flex-1"
          />
        )}
      </View>

      <Button
        title="Agendar Consulta"
        onPress={() => {
          navigation.navigate("SelectClientAdmin");
        }}
        className="mb-16"
      />
    </View>
  );
}

