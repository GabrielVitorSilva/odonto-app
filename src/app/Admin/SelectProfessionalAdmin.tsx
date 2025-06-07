import { useCallback, useState } from "react";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { PersonList } from "@/components/PersonList";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { treatmentsService } from "@/services/treatments";
import type { ProfessionalUser } from "@/services/types/treatments";
import { useAuth } from "@/contexts/AuthContext";

export default function SelectProfessionalAdmin() {
  const {clientSelected} = useAuth();
  
  const [selected, setSelected] = useState<string[]>([]);
  const navigation = useNavigation();

  const [patients, setPatients] = useState<ProfessionalUser[]>([]);

  async function fetchProfessionals() {    
    const data = await treatmentsService.listProfessionals()
    setPatients(data);
  }

  useFocusEffect(
    useCallback(() => {
      fetchProfessionals();
    }, [])
  );

  return (
    <View className="flex-1">
      <Header />
      <View className="flex-1 px-4 py-4">
        <Text className="text-center text-3xl font-semibold">
          Selecione o Odontólogo
        </Text>
        <Text className="text-app-blue font-semibold text-lg my-8">
          Lista de Odontólogos
        </Text>

        <View className="flex-1">
          <PersonList
            list={patients}
            selected={selected}
            setSelected={setSelected}
          />
        </View>
      </View>
      <Button
        className="mb-5"
        title="Selecionar"
        onPress={() => navigation.navigate("SelectDateHourAdmin")}
      />
    </View>
  );
}
