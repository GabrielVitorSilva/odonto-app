import { ImageBackground, View, Text } from "react-native";
import { Button } from "@/components/Button";

type ConsultationPageProps = {
  name: string;
  description: string;
  date: string;
  hour: string;
  professionalName: string;
};

export default function ConsultationPage() {
  return (
    <View className="h-full">
      <View
        className="w-full h-72 bg-app-blue"
      />

      <View className="px-5 flex-1 justify-between">
        <View>
          <Text className="text-3xl font-semibold my-3">Clareamento</Text>
          <Text>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum{" "}
          </Text>
        </View>

        <View>
          <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
            <Text className="font-bold">Data</Text>
            <Text>16/05</Text>
          </View>
          <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
            <Text className="font-bold">Horário</Text>
            <Text>17:00</Text>
          </View>
          <View className="flex-row justify-between pb-2 m-2 border-b border-gray-300">
            <Text className="font-bold">Profissional</Text>
            <Text>Julio Guerra</Text>
          </View>
        </View>
        <Button
          title="Cancelar Consulta"
          onPress={() => {}}
          className="bg-app-red mb-16"
        />
      </View>
    </View>
  );
}