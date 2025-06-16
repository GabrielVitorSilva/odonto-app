import { View, Text, FlatList } from "react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { consultationService, type ListAllConsultation } from "@/services/consultations";
import { treatmentsService } from "@/services/treatments";
import BottomDrawer from "@/components/BottomDrawer";
import { useToast } from "@/contexts/ToastContext";

export default function HomeClient() {
  const navigation = useNavigation();
  const { profile } = useAuth();
  const { showToast } = useToast();

  const [consultations, setConsultations] = useState<ListAllConsultation[]>([]);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [idToCancel, setIdToCancel] = useState<string>('');

  const fetchConsultations = async () => {
    try {
      if (!profile) return;
      
      const data = await consultationService.listAllClientConsultations(profile.user.profileData.id);
      setConsultations(data.consultations);
    } catch (error) {
      showToast('Erro ao carregar consultas', 'error');
    }
  };

  const handleCancelConsultation = async () => {
    try {
      await consultationService.deleteConsultation(idToCancel);
      await fetchConsultations(); // Atualiza a lista após cancelamento
      setShowDrawer(false);
      showToast('Consulta cancelada com sucesso', 'success');
    } catch (error) {
      showToast('Erro ao cancelar consulta', 'error');
    }
  };

  const handleLongPressCard = (consultationId: string) => {
    setIdToCancel(consultationId);
    setShowDrawer(true);
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString("pt-BR"),
      time: date.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })
    };
  };

  useFocusEffect(
    useCallback(() => {
      fetchConsultations();
    }, [])
  );

  return (
    <View className="flex-1 w-full">
      <Header
        className="bg-app-blue pb-24"
        contentColor="white"
        title="Perfil"
        hasExit={true}
      />
      
      <Text className="text-center text-3xl font-semibold my-[25px]">
        {profile?.user.User.name}
      </Text>

      <Text className="text-app-blue ml-5 mb-5 text-lg font-semibold">
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
                name={item.clientName}
                upperText="Procedimentos:"
                lowerText={item.treatmentName}
                date={date}
                hour={time}
                status={item.status}
              />
            );
          }}
          className="w-full px-5 mx-auto"
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>

      <View className="absolute bottom-0 w-full px-5 pb-5 bg-gray-100">
        <Button 
          title="Agendar Triagem" 
          onPress={() => navigation.navigate("SelectDatePatient")} 
        />
      </View>

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
