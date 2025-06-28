import { View, Text } from "react-native";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useToast } from "@/contexts/ToastContext";
import { consultationService } from "@/services/consultations";

type RouteParams = {
  id: string;
  name: string;
  date: string;
  hour: string;
  status: string;
  professionalName: string;
};

export default function ConsultationPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const { showToast } = useToast();
  const { id, name, date, hour, professionalName, status } =
    route.params as RouteParams;

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
    }[status] || {};

  async function handleCancelConsultation() {
    try {
      await consultationService.deleteConsultation(id);
      navigation.goBack();
      showToast("Consulta cancelada com sucesso!", "success");
    } catch (error) {
      showToast("Erro ao carregar consultas", "error");
    }
  }

  return (
    <View className="h-full">
      <Header className="bg-app-blue" contentColor="white" />
      <View className="px-5 flex-1 justify-between">
        <View>
          <Text className="text-3xl font-semibold my-6">{name}</Text>
        </View>

        <View>
          <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
            <Text className="font-bold">Status</Text>
            <Text>{statusStyle.text}</Text>
          </View>
          <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
            <Text className="font-bold">Data</Text>
            <Text>{date}</Text>
          </View>
          <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
            <Text className="font-bold">Horário</Text>
            <Text>{hour}</Text>
          </View>
          <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
            <Text className="font-bold">Professional</Text>
            <Text>{professionalName}</Text>
          </View>
        </View>

        <View>
          {status === "SCHEDULED" && (
            <Button
              className="mt-4 bg-app-red"
              title="Cancelar Consulta"
              onPress={handleCancelConsultation}
            />
          )}
        </View>
      </View>
    </View>
  );
}

