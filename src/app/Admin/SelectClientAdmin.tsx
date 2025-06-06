import { useState } from "react";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { PersonList } from "@/components/PersonList";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";

export default function SelectClientAdmin() {
  const [selected, setSelected] = useState<string[]>([]);
  const navigation = useNavigation();

  const list = [
    { name: "Victoria Robertson" },
    { name: "Lucas Andrade" },
    { name: "Flávia Souza" },
    { name: "Thiago Monteiro" },
    { name: "Camila Duarte" },
  ];

  return (
    <View className="flex-1">
      <Header />
      <View className="flex-1 px-4 py-4">
        <Text className="text-center text-3xl font-semibold">
          Selecione o Cliente
        </Text>
        <Text className="text-app-blue font-semibold text-lg my-8">
          Lista de Clientes
        </Text>

        <View className="flex-1">
          <PersonList
            list={list}
            selected={selected}
            setSelected={setSelected}
          />
        </View>
      </View>
      <Button
        className="mb-5"
        title="Selecionar"
        onPress={() => navigation.navigate("SelectProfessionalAdmin")}
      />
    </View>
  );
}
