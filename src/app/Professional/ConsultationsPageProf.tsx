import { View, Text, FlatList } from "react-native";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { useNavigation } from "@react-navigation/native";
import { consultationService } from "@/services/consultations";
import { ConsultationStatus } from "@/services/types/consultations";

export default function ConsultationsPageProf() {
  const navigation = useNavigation();
  const consultations = [
    {
      id: 1,
      name: "Clareamento",
      patient: "Victoria Robertson",
      professional: "Alberes",
      status: "Pendente",
      date: "12/03/2025",
      hour: "12:00",
    },
    {
      id: 2,
      name: "Clareamento",
      patient: "Lucas",
      professional: "Maria Santos",
      status: "Confirmado",
      date: "12/03/2025",
      hour: "12:00",
    },
    {
      id: 3,
      name: "Clareamento",
      patient: "Marcelo",
      professional: "Flávia Souza",
      status: "Cancelado",
      date: "12/03/2025",
      hour: "12:00",
    },
    {
      id: 4,
      name: "Clareamento",
      patient: "Gabriel Vitor",
      professional: "Alberes",
      status: "Finalizado",
      date: "12/03/2025",
      hour: "12:00",
    },
  ];

  consultationService.updateConsultation('a57777c9-a87c-486e-ab73-36eb8a970834', {clientId: "0c04a807-7a69-4abe-8ede-d441944fab36", treatmentId: "8548e3e8-930f-41c1-989c-4fcfb3cb90a3", dateTime: new Date("2025-06-16T09:00:00.000Z"), professionalId: "eeeeaabd-dd32-4678-9c45-ad4fa9306685", status: 'CANCELED'})

  return (
    <View>
      <Header className="bg-app-blue" contentColor="white" />
      <View className="px-4">
        <View className="border rounded-3xl border-gray-300 py-4 my-8 ">
          <Text className="text-app-blue font-semibold text-center">
            Atendimentos
          </Text>
        </View>
        <FlatList
          data={consultations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card
              name={item.name}
              upperText={`Paciente: ${item.patient}`}
              lowerText={`Profissional: ${item.professional}`}
              date={item.date}
              hour={item.hour}
              status={item.status}
            />
          )}
          className="w-full px-5 mx-auto"
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