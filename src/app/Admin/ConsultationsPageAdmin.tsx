import { View, Text, FlatList } from "react-native";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  consultationService,
  formatDateTime,
  type ListAllConsultation,
} from "@/services/consultations";
import { useCallback, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";
import { useToast } from "@/contexts/ToastContext";

export default function ConsultationsPageAdmin() {
  const navigation = useNavigation();
  const { showToast } = useToast();
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [consultations, setConsultations] = useState<ListAllConsultation[]>([]);

  async function fetchConsultations() {
    try {
      setLoading(true);
      if (!profile) {
        console.error("User profile is not available");
        return;
      }
      const data = await consultationService.listAllConsultations(
        profile.user.User.id
      );
      setConsultations(data.consultations);
    } catch (error: any) {
      showToast("Erro ao carregar consultas", "error");
    } finally {
      setLoading(false);
    }
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

        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={consultations}
            keyExtractor={(item) => item.id.toString()}
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
                    navigation.navigate("ConsultationPageAdmin", {
                      id: item.id,
                      dateTime: item.dateTime,
                      status: item.status,
                      patientName: item.clientName,
                      professionalName: item.professionalName,
                      treatmentName: item.treatmentName,
                    })
                  }
                />
              );
            }}
            className="w-full mx-auto flex-1"
          />
        )}
      </View>

      <Button
        title="Agendar Consulta"
        onPress={() => {
          navigation.navigate("SelectClientAdmin");
        }}
        className="mb-4"
      />
    </View>
  );
}

