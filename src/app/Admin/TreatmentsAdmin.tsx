import { useCallback, useState } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { Button } from "@/components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { treatmentsService, Treatment } from "@/services/treatments";
import Loading from "@/components/Loading";
import { useToast } from "@/contexts/ToastContext";
import { Ionicons } from "@expo/vector-icons";
import BottomDrawer from "@/components/BottomDrawer";

export default function TreatmentsAdmin() {
  const navigation = useNavigation();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  async function handleRemoveTreatment() {
    try {
      const deletePromises = selected.map((treatmentId) =>
        treatmentsService.deleteTreatment(treatmentId)
      );

      await Promise.all(deletePromises);

      showToast("Tratamento(s) removido(s) com sucesso!", "success");
      setTreatments((prevTreatments) =>
        prevTreatments.filter((treatment) => !selected.includes(treatment.id))
      );
      setSelected([]);
      setShowDrawer(false);
    } catch (error: any) {
      showToast("Erro ao remover tratamento(s)", "error");
    }
  }

  async function loadTreatments() {
    try {
      setLoading(true);
      const response = await treatmentsService.listAllTreatments();
      setTreatments(response.treatments);
    } catch (error: any) {
      showToast("Erro ao carregar tratamentos", "error");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadTreatments();
    }, [])
  );

  function TreatmentsEmpty() {
    return (
      <ListEmptyComponent
        iconName="medkit"
        text="Não há tratamentos cadastrados ainda"
      />
    );
  }

  function handlePress(item: Treatment) {
    if (selected.includes(item.id)) {
      setSelected((prevSelected) =>
        prevSelected.filter((elem) => elem !== item.id)
      );
    } else {
      selected.length > 0
        ? setSelected((prevSelected) => [...prevSelected, item.id])
        : navigation.navigate("TreatmentPageAdmin", {
            name: item.name,
            treatment_id: item.id,
            description: item.description,
            professionals: item.professionals.map((p) => p.userId),
          });
    }
  }

  function handleLongPress(id: string) {
    if (!selected.includes(id)) {
      setSelected((prevSelected) => [...prevSelected, id]);
    }
  }

  return (
    <View className="flex-1 bg-gray-50">
      {selected.length === 0 ? (
        <Header
          title="Tratamentos"
          handleGoBack={() => navigation.navigate("HomeAdmin")}
        />
      ) : (
        <View className="flex-row items-center justify-between w-ful pb-5 pt-20 px-5">
          <TouchableOpacity onPress={() => setSelected([])}>
            <Ionicons name="arrow-back" size={32}></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDrawer(true)}>
            <Ionicons name="trash" size={32} />
          </TouchableOpacity>
        </View>
      )}

      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={treatments}
          ListEmptyComponent={TreatmentsEmpty}
          renderItem={({ item }) => (
            <Card
              name={item.name}
              upperText={item.description}
              handleLongPress={() => handleLongPress(item.id)}
              handlePress={() => handlePress(item)}
              className={`mb-[2px] ${
                selected.includes(item.id) && "bg-app-light-blue rounded-xl"
              }`}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          className="w-full px-5 mt-8 mx-auto"
        />
      )}

      <Button
        className="mb-4"
        title="Cadastrar Tratamento"
        onPress={() =>
          navigation.navigate("RegisterNewTreatment", { professionals: [] })
        }
      />

      <BottomDrawer
        title="Remover tratamento"
        content={
          <Text className="text-center mb-6">
            Deseja realmente os tratamentos selecionados?
          </Text>
        }
        handlePress={handleRemoveTreatment}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        buttonTitle="Remover agora"
      />
    </View>
  );
}
