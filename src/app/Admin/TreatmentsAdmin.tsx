import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import Header from "@/components/Header";
import Card from "@/components/Card";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { Button } from "@/components/Button";
import { useNavigation } from "@react-navigation/native";
import { treatmentsService, Treatment } from "@/services/treatments";

export default function TreatmentsAdmin() {
  const navigation = useNavigation();
  const [treatments, setTreatments] = React.useState<Treatment[]>([]);
  
  useEffect(() => {
    async function loadTreatments() {
      try {
        const response = await treatmentsService.listAllTreatments();
        setTreatments(response.treatments);
      } catch (error) {
        console.error('Erro ao carregar tratamentos:', error);
      }
    }
    
    loadTreatments();
  }, []);

  function TreatmentsEmpty(){
    return <ListEmptyComponent iconName="medkit" text="Não há tratamentos cadastrados ainda" />
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Tratamentos" handleGoBack={() => navigation.navigate("HomeAdmin")} />

      <FlatList
        data={treatments}
        ListEmptyComponent={TreatmentsEmpty}
        renderItem={({ item }) => (
          <Card
            name={item.name}
            upperText={item.description}
            handlePress={() =>
              navigation.navigate("TreatmentPageAdmin", {
                name: item.name,
                description: item.description,
                professionals: item.professionals.map(p => p.userId),
              })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        className="w-full px-5 mt-8 mx-auto"
      />

      <Button
        className="mb-16"
        title="Cadastrar Tratamento"
        onPress={() =>
          navigation.navigate("RegisterNewTreatment", { professionals: [] })
        }
      />
    </View>
  );
}
