import { View, Text, FlatList } from "react-native";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  consultationService,
  formatDateTime,
  type ListAllConsultation,
} from "@/services/consultations";
import BottomDrawer from "@/components/BottomDrawer";
import { useToast } from "@/contexts/ToastContext";
import HomeHeader from "@/components/HomeHeader";

export default function HomeClient() {
  const navigation = useNavigation();
  const { profile } = useAuth();
  const { showToast } = useToast();

  const [consultations, setConsultations] = useState<ListAllConsultation[]>([]);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [idToCancel, setIdToCancel] = useState<string>("");

  const fetchConsultations = async () => {
    try {
      if (!profile) return;

      const data = await consultationService.listConsultationsByClient(
        profile.user.profileData.id
      );
      setConsultations(data.consultations);
    } catch (error) {
      showToast("Erro ao carregar consultas", "error");
    }
  };

  const handleCancelConsultation = async () => {
    try {
      await consultationService.deleteConsultation(idToCancel);
      await fetchConsultations(); // Atualiza a lista após cancelamento
      setShowDrawer(false);
      showToast("Consulta cancelada com sucesso", "success");
    } catch (error) {
      showToast("Erro ao cancelar consulta", "error");
    }
  };

  const handleLongPressCard = (consultationId: string) => {
    setIdToCancel(consultationId);
    setShowDrawer(true);
  };

  useFocusEffect(
    useCallback(() => {
      fetchConsultations();
    }, [])
  );

  return (
    <View className="flex-1 w-full">
      <HomeHeader title="Perfil" />

      <Text className="text-center text-neutral-700 text-3xl font-semibold">
        {profile?.user.User.name}
      </Text>

      <Text className="text-app-blue ml-5 my-5 text-lg font-semibold">
        Lista de consultas
      </Text>

      <View className="flex-1">
        <FlatList
          data={consultations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const { date, time } = formatDateTime(item.dateTime.toString());

            return (
              <Card
                handleLongPress={() => handleLongPressCard(item.id)}
                name={item.treatmentName}
                upperText={item.professionalName}
                date={date}
                hour={time}
                status={item.status}
                handlePress={() =>
                  navigation.navigate("ConsultationPage", {
                    name: item.treatmentName,
                    date: date,
                    hour: time,
                    professionalName: item.professionalName,
                    status: item.status
                  })
                }
              />
            );
          }}
          className="w-full px-5 mx-auto"
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>

      <Button
        className="mb-4"
        title="Ver tratamentos disponíveis"
        onPress={() => navigation.navigate("TreatmentsPatient")}
      />

      <BottomDrawer
        title="Agendar consulta"
        content={
          <Text className="text-center mb-6">
            Deseja realmente cancelar sua consulta?
          </Text>
        }
        handlePress={handleCancelConsultation}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        buttonTitle="Cancelar consulta"
      />
    </View>
  );
}

