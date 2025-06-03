import { useState } from "react";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { PersonList } from "@/components/PersonList";
import { View, Text } from "react-native";
import BottomDrawer from "@/components/BottomDrawer";
import { useNavigation } from "@react-navigation/native";

export default function BindProfessionalAdmin() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selected, setSelected] = useState<String[]>([]);
  const [noSelected, setNoSelected] = useState(false);

  const navigation = useNavigation();

  const list = [
    { name: "Alberes" },
    { name: "Maria Santos" },
    { name: "Flávia Souza" },
    { name: "Thiago Monteiro" },
    { name: "Camila Duarte" },
  ];

  const handleBind = () => {
    if (selected.length > 0) {
      setShowDrawer(true);
    } else {
      setNoSelected(true);
    }
  };

  const handleConfirmation = () => {
    navigation.navigate("RegisterNewTreatment", {
      professionals: [...selected],
    });
  };

  const content = (
    <Text className="text-center">
      Deseja realmente vincular{" "}
      <Text className="text-app-blue font-semibold">estes odontólogos</Text> com
      o <Text className="text-app-blue font-semibold">tratamento</Text>?
    </Text>
  );

  return (
    <View className="flex-1">
      <Header />
      <View className="flex-1 px-4 py-4">
        <Text className="text-center text-3xl font-semibold">Odontólogos</Text>

        <View className="flex-1">
          <PersonList
            list={list}
            multiselection
            selected={selected}
            setSelected={setSelected}
          />
        </View>
      </View>

      <View className="mb-16">
        <Button title="Vincular Tratamento" onPress={handleBind} />
        {noSelected && (
          <Text className="text-lg text-app-red text-center mt-3">
            Selecione pelo menos um Odontólogo
          </Text>
        )}
      </View>

      <BottomDrawer
        title="Vincular Funcionário?"
        content={content}
        buttonTitle="Vincular agora"
        handlePress={handleConfirmation}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
      />
    </View>
  );
}
