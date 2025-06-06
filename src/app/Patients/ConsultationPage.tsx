import { View, Text } from "react-native";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
  name: string;
  date: string;
  hour: string;
  status: string;
  patientName: string;
};

export default function ConsultationPage() {
  const route = useRoute();
  const { name, date, hour, status, patientName } = route.params as RouteParams;

  return (
    <View className="h-full">
      <Header className="bg-app-blue" contentColor="white" />
      <View className="px-5 flex-1 justify-between">
        <View>
          <Text className="text-3xl font-semibold my-3">{name}</Text>
          <Text></Text>
        </View>
        <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
          <Text className="font-bold">Status</Text>
          <Text>{status}</Text>
        </View>
        <View>
          <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
            <Text className="font-bold">Data</Text>
            <Text>{date}</Text>
          </View>
          <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
            <Text className="font-bold">Horário</Text>
            <Text>{hour}</Text>
          </View>
          <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
            <Text className="font-bold">Paciente</Text>
            <Text>{patientName}</Text>
          </View>
        </View>

        <View>
          {status == "Pendente" && (
            <Button
              title="Cancelar Consulta"
              onPress={() => {}}
              className="bg-app-red mb-16 mt-4"
            />
          )}
        </View>
      </View>
    </View>
  );
}
