import { View, Text } from "react-native";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
  name: string;
  dateTime: Date;
  status: string;
  patientName: string;
  professionalName: string;
};

export default function ConsultationPageAdmin() {
  const route = useRoute();
  const { name, dateTime, status, patientName, professionalName } =
    route.params as RouteParams;

  const statusStyle =
    {
      SCHEDULED: {
        text: "Agendada"
      },
      CANCELED: {
        text: "Cancelada"
      },
      COMPLETED: {
        text: "Finalizada"
      },
    }[status] || {};

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

        <View>
          {status === "SCHEDULED" && (
            <Button
              className="mt-4 mb-16"
              title="Marcar como finalizada"
              onPress={() => {}}
            />
          )}
        </View>
      </View>
    </View>
  );
}
