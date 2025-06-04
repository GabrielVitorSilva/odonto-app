import { View, Text, FlatList } from "react-native";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { useNavigation } from "@react-navigation/native";
import ListEmptyComponent from "@/components/ListEmptyComponent";

export default function ConsultationsPageAdmin() {
  const navigation = useNavigation();

  type Consultation = {
    id: number;
    name: string;
    patient: string;
    professional: string;
    status: string;
    date: string;
    hour: string;
  }

  const consultations: Consultation[] = [
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

  function ConsultationsEmpty(){
    return (<ListEmptyComponent iconName="clipboard" text="Não há consultas ainda" />);
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
          ListEmptyComponent={ConsultationsEmpty}
          renderItem={({ item }) => (
            <Card
              name={item.name}
              upperText={`Paciente: ${item.patient}`}
              lowerText={`Profissional: ${item.professional}`}
              date={item.date}
              hour={item.hour}
              status={item.status}
              handlePress={() =>
                navigation.navigate("ConsultationPageAdmin", {
                  name: item.name,
                  date: item.date,
                  hour: item.hour,
                  status: item.status,
                  patientName: item.patient,
                  professionalName: item.professional,
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
