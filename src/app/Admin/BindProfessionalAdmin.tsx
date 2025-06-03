import { useState } from "react";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { PersonList } from "@/components/PersonList";
import { View, Text } from "react-native";
import BottomDrawer from "@/components/BottomDrawer";

export default function BindProfessionalAdmin() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selected, setSelected] = useState<String[]>([]);

  const list = [
    { name: "Alberes" },
    { name: "Maria Santos" },
    { name: "Flávia Souza" },
    { name: "Thiago Monteiro" },
    { name: "Camila Duarte" },
  ];

  const handleVincular = () => {
    setShowDrawer(false);
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
            selected={selected}
            setSelected={setSelected}
          />
        </View>
      </View>

      <Button
        className="mb-16"
        title="Vincular Tratamento"
        onPress={() => setShowDrawer(true)}
      />

      <BottomDrawer
        title="Vincular Funcionário?"
        content={content}
        buttonTitle="Vincular agora"
        handlePress={handleVincular}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
      />
    </View>
  );
}
