import { View, Text, FlatList } from "react-native";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { consultationService, type ListAllConsultation,   } from "@/services/consultations";
import { useCallback, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";

export default function ConsultationsPageAdmin() {
  const navigation = useNavigation();
  const {profile} = useAuth();
  const [consultations, setConsultations] = useState<ListAllConsultation[]>([]);

  async function fetchConsultations() {
    if (!profile) {
      console.error("User profile is not available");
      return;
    }
    const data = await consultationService.listAllConsultations(profile.user.User.id);
    setConsultations(data.consultations);
  }

  useFocusEffect(
    useCallback(() => {
      fetchConsultations();
    }, [])
  );
  
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
          renderItem={({ item }) => (
            <Card
              name={item.treatmentName}
              upperText={`Paciente: ${item.clientName}`}
              lowerText={`Profissional: ${item.professionalName}`}
              date={new Date(item.dateTime).toLocaleDateString("pt-BR")}
              hour={new Date(item.dateTime).toLocaleTimeString("pt-BR")}
              status={item.status}
              handlePress={() =>
                navigation.navigate("ConsultationPageAdmin", {
                  name: item.treatmentName,
                  dateTime: item.dateTime,
                  status: item.status,
                  patientName: item.clientName,
                  professionalName: item.professionalName,
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
          navigation.navigate("SelectClientAdmin");
        }}
        className="mb-16"
      />
    </View>
  );
}

