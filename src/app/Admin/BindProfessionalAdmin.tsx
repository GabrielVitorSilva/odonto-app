import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { PersonList } from "@/components/PersonList";
import { View, Text } from "react-native";
import BottomDrawer from "@/components/BottomDrawer";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/@types/navigation";
import { treatmentsService } from "@/services/treatments";
import type { IUser, ProfessionalUser } from "@/services/types/treatments";
import Loading from "@/components/Loading";
import ListEmptyComponent from "@/components/ListEmptyComponent";

type RouteParams = {
  treatment_id: string;
};

export default function BindProfessionalAdmin() {
  const route = useRoute();
  const { treatment_id } = route.params as RouteParams;
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [noSelected, setNoSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [professionals, setProfessionals] = useState<ProfessionalUser[]>([]);
  const navigation = useNavigation();

  async function fetchProfessionals() {
    try {
      setLoading(true);
      const data = await treatmentsService.listProfessionals();
      setProfessionals(data);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProfessionals();
    }, [])
  );

  const handleBind = () => {
    if (selectedIds.length > 0) {
      setShowDrawer(true);
    } else {
      setNoSelected(true);
    }
  };

  const handleConfirmation = async () => {
    try {
      await treatmentsService.addProfessionalFromTreatment(
        treatment_id,
        selectedIds
      );
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao vincular profissionais:", error);
    }
  };

  const content = (
    <Text className="text-center">
      Deseja realmente vincular{" "}
      <Text className="text-app-blue font-semibold">estes odontólogos</Text> com
      o <Text className="text-app-blue font-semibold">tratamento</Text>?
    </Text>
  );

  const handleSelection = (
    value: string[] | ((prevState: string[]) => string[])
  ) => {
    const names = typeof value === "function" ? value(selectedNames) : value;
    setSelectedNames(names);
    const ids = professionals
      .filter((prof) => names.includes(prof.name))
      .map((prof) => prof.id);
    setSelectedIds(ids);
  };

  function ProfessionalsEmpty() {
    return (
      <ListEmptyComponent
        iconName="medical"
        text="Não há funcionários vinculados ainda"
      />
    );
  }

  return (
    <View className="flex-1">
      <Header />
      <View className="flex-1 px-4 py-4">
        <Text className="text-center text-3xl font-semibold">Odontólogos</Text>

        {loading ? (
          <Loading />
        ) : (
          <View className="flex-1">
            <PersonList
              list={professionals}
              multiselection
              selected={selectedNames}
              setSelected={handleSelection}
              ListEmptyComponent={ProfessionalsEmpty}
            />
          </View>
        )}
      </View>

      <View className="mb-4">
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

