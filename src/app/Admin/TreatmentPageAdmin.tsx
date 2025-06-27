import Header from "@/components/Header";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Button } from "@/components/Button";
import { useToast } from "@/contexts/ToastContext";
import { treatmentsService } from "@/services/treatments";

type RouteParams = {
  name: string;
  description: string;
  treatment_id: string;
  professionals: string[];
};

export default function TreatmentPageAdmin() {
  const route = useRoute();
  const { name, description, treatment_id } = route.params as RouteParams;
  const { professionals } = route.params as RouteParams;
  const [nameInputValue, setName] = useState(name);
  const [descriptionInputValue, setDescription] = useState(description);
  const {showToast} = useToast()
  const navigation = useNavigation();

  async function handleEdit() {
    if (!name.trim() || !description.trim()) {
      showToast('Por favor, preencha todos os campos', 'error');
      return;
    }
    
    const response = await treatmentsService.editTreatment(treatment_id, {
      name: nameInputValue.trim(),
      description: descriptionInputValue.trim(),
    })
    if(response){
      showToast('Tratamento editado com sucesso!', 'success');
      navigation.goBack();
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <Header handleGoBack={() => navigation.navigate("TreatmentsAdmin")} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4 flex-1">
          <Text className="text-3xl font-semibold mb-8 text-center">
            Editar Tratamento
          </Text>

          <View className="space-y-4">
            <View>
              <Text className="text-base font-medium mb-2 text-gray-700">Nome do Tratamento</Text>
              <TextInput
                className="bg-gray-100 p-4 rounded-2xl text-base font-roboto border border-gray-200"
                placeholder="Digite o nome do tratamento"
                placeholderTextColor="#999"
                value={nameInputValue}
                onChangeText={setName}
              />
            </View>

            <View>
              <Text className="text-base font-medium mb-2 text-gray-700">Descrição</Text>
              <TextInput
                className="bg-gray-100 p-4 rounded-2xl text-base font-roboto h-40 border border-gray-200"
                style={{ textAlignVertical: "top" }}
                placeholder="Digite a descrição do tratamento"
                placeholderTextColor="#999"
                multiline
                value={descriptionInputValue}
                onChangeText={setDescription}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-4 pb-8 pt-4 bg-white">
        <Button 
          title="Confirmar" 
          onPress={handleEdit} 
          className="w-full"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
