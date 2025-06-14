import { View, Text, FlatList } from "react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import { Button } from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { consultationService, type ListAllConsultation } from "@/services/consultations";

export default function HomeClient() {
  const { profile } = useAuth()
  const [consultations, setConsultations] = useState<ListAllConsultation[]>([]);

  async function fetchConsultations() {
    if (!profile) {
      return;
    }
    const data = await consultationService.listAllClientConsultations(profile.user.profileData.id);
    setConsultations(data.consultations);
  }

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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card
              name={item.clientName}
              upperText={`Procedimentos:`}
              lowerText={`${item.treatmentName}`}
              date={new Date(item.dateTime).toLocaleDateString("pt-BR")}
              hour={new Date(item.dateTime).toLocaleTimeString("pt-BR")}
              status={item.status}
            />
          )}
          className="w-full px-5 mx-auto"
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>

      <View className="absolute bottom-0 w-full px-5 pb-5 bg-gray-100">
        <Button title="Agendar Triagem" onPress={() => {}} />
      </View>
    </View>
  );
}
