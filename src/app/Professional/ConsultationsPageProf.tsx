import { View, Text, FlatList } from "react-native";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Consultation, consultationService,} from "@/services/consultations";
import { treatmentsService } from "@/services/treatments";
import { useCallback, useState } from "react";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { useAuth } from "@/contexts/AuthContext";

type ConsultationsWithDetails = Consultation & {
  treatmentName: string;
  clientName: string;
  professionalName: string;
};

export default function ConsultationsPageProf() {
  const navigation = useNavigation();
  const { profile } = useAuth();
  const [consultations, setConsultations] = useState<ConsultationsWithDetails[]>([]);

  async function fetchConsultations() {
    console.log("Fetching consultations for profile:", profile);
    
    if (!profile) {
      console.error("User profile is not available");
      return;
    }
    const data = await consultationService.listConsultationsByProfessional(profile.user.profileData.id);
    console.log("Consultations fetched:", data);
    
    const consultationsWithDetails = await Promise.all(
      data.consultations.map(async (consultation) => {
        const treatment = await treatmentsService.getTreatment(consultation.treatmentId);
        return {
          ...consultation,
          treatmentName: treatment.name,
          clientName: "Carregando...", 
          professionalName: profile.user.User.name
        } as ConsultationsWithDetails;
      })
    );
    
    setConsultations(consultationsWithDetails);
  }

  useFocusEffect(
    useCallback(() => {
      fetchConsultations();
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
        <FlatList
          data={consultations}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={ConsultationsEmpty}
          renderItem={({ item }) => (
            <Card
              name={item.treatmentName}
              upperText={`Paciente: ${item.clientName}`}
              lowerText={`Profissional: ${item.professionalName}`}
              date={new Date(item.dateTime).toLocaleDateString("pt-BR")}
              hour={new Date(item.dateTime).toLocaleTimeString("pt-BR")}
              status={item.status}
              handlePress={() =>
                navigation.navigate("ConsultationPageProf", {
                  name: item.treatmentName,
                  dateTime: item.dateTime,
                  status: item.status,
                  patientName: item.clientName
                })
              }
            />
          )}
          className="w-full px-5 mx-auto flex-1"
        />
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
