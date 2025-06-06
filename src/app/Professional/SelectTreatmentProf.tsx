import { View, FlatList, Text } from "react-native";
import Card from "@/components/Card";
import Header from "@/components/Header";
import BottomDrawer from "@/components/BottomDrawer";
import { Button } from "@/components/Button";
import { useState } from "react";

interface Treatment {
  id: number;
  title: string;
  description: string;
  color: string;
}

export default function SelectTreatmentProf() {

  const [selectedTreatment, setSelectedTreatment] = useState(" ")
  const [showDrawer, setShowDrawer] = useState(false)
  const [noSelected, setNoSelected] = useState(false);

  const handlePress = () => {
    if (selectedTreatment != " ") {
      setShowDrawer(true);
    } else {
      setNoSelected(true);
    }
  };

  const treatments: Treatment[] = [
    {
      id: 1,
      title: "Clareamento",
      description:
        "Procedimentos: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      color: "bg-orange-100",
    },
    {
      id: 2,
      title: "Limpeza",
      description:
        "Procedimentos: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      color: "bg-gray-800",
    },
    {
      id: 3,
      title: "Implante",
      description:
        "Procedimentos: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      color: "bg-pink-100",
    },
    {
      id: 4,
      title: "Manutenção",
      description:
        "Procedimentos: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      color: "bg-blue-100",
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Tratamentos" />

      <FlatList
        data={treatments}
        renderItem={({ item }) => (
          <Card className={`p-3 ${selectedTreatment == item.title ? "bg-app-light-blue rounded-xl" : " "}`} handlePress={() => setSelectedTreatment(item.title)} name={item.title} upperText={item.description} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        className="w-full px-5 mt-8 mx-auto"
      />

      <View className="mb-16">
        <Button title="Selecionar" onPress={handlePress} />
        {noSelected && (
          <Text className="text-lg text-app-red text-center mt-3">
            Selecione um tratamento
          </Text>
        )}
      </View>

      <BottomDrawer
              title="Agendar consulta"
              content={
                <Text className="text-center mb-6">
                  Deseja realmente agendar uma{" "}
                  <Text className="text-app-blue font-semibold">Clareamento</Text>{" "}
                  para{" "}
                  <Text className="text-app-blue font-semibold">
                    Victoria Robertson
                  </Text>
                  ?
                </Text>
              }
              handlePress={() => {}}
              showDrawer={showDrawer}
              setShowDrawer={setShowDrawer}
              buttonTitle="Agendar agora"
            />
    </View>
  );
}
