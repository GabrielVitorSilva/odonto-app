import { TouchableOpacity, View, Text, FlatList } from "react-native";
import Card from "@/components/Card";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/Button";

export default function ConsultationsPageAdmin() {
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

  return (
    <View>
      <View className=" bg-app-blue py-10 px-5">
        <TouchableOpacity>
          <Ionicons color={"white"} size={32} name="arrow-back" />
        </TouchableOpacity>
      </View>
      <View className="px-4">
        <View className="border rounded-3xl border-gray-300 py-4 my-8 ">
          <Text className="text-app-blue font-semibold text-center">
            Atendimentos
          </Text>
        </View>
        <FlatList
          data={consultations}
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

      <Button title="Agendar Consulta" onPress={() => {}} />
    </View>
  );
}
