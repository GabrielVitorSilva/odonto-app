import { View, Text } from "react-native";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { useRoute } from "@react-navigation/native";
import { consultationService } from "@/services/consultations";
import { useState } from "react";
import { useToast } from "@/contexts/ToastContext";

type RouteParams = {
  id: string;
  name: string;
  dateTime: Date;
  status: string;
  patientName: string;
  professionalName: string;
};

export default function ConsultationPageAdmin() {
  const { showToast } = useToast();
  const route = useRoute();
  const { id, name, dateTime, status, patientName, professionalName } =
    route.params as RouteParams;

  const [statusState, setStatusState] = useState(status);

  const statusStyle =
    {
      SCHEDULED: {
        text: "Agendada",
      },
      CANCELED: {
        text: "Cancelada",
      },
      COMPLETED: {
        text: "Finalizada",
      },
    }[statusState] || {};

  function handleCancelConsultation() {
    try {
      consultationService.deleteConsultation(id);
      setStatusState("CANCELED");
      showToast("Consulta cancelada com sucesso!", "success");
    } catch (error) {
      showToast("Erro ao carregar consultas", "error");
    }
  }

  function handleCompleteConsultation() {
    try {
      // consultationService.completeConsultation(id);
      setStatusState("COMPLETED");
      showToast("Consulta marcada como finalizada com sucesso", "success");
    } catch (error) {
      showToast("Error ao marcar como Finalizado", "error");
    }
  }

  return (
    <View className="h-full">
      <Header className="bg-app-blue" contentColor="white" />
      <View className="px-5 flex-1 justify-between">
        <View>
          <Text className="text-3xl font-semibold my-3">{name}</Text>
          <Text></Text>
        </View>

        <View>
          <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
            <Text className="font-bold">Status</Text>
            <Text>{statusStyle.text}</Text>
          </View>
          <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
            <Text className="font-bold">Data</Text>
            <Text>{new Date(dateTime).toLocaleDateString("pt-BR")}</Text>
          </View>
          <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
            <Text className="font-bold">Horário</Text>
            <Text>{new Date(dateTime).toLocaleTimeString("pt-BR")}</Text>
          </View>
          <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
            <Text className="font-bold">Paciente</Text>
            <Text>{patientName}</Text>
          </View>
          <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
            <Text className="font-bold">Profissional</Text>
            <Text>{professionalName}</Text>
          </View>
        </View>

        <View className="mb-16">
          {statusState === "SCHEDULED" && (
            <>
              <Button
                className="mt-4"
                title="Marcar como finalizada"
                onPress={handleCompleteConsultation}
              />

              <Button
                className="mt-4 bg-app-red"
                title="Cancelar Consulta"
                onPress={handleCancelConsultation}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
}
