import Header from "@/components/Header";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Button } from "@/components/Button";
import { useToast } from "@/contexts/ToastContext";
import { treatmentsService } from "@/services/treatments";
import { formatToCurrency, parseCurrencyToNumber } from "@/utils/currency";

type RouteParams = {
  name: string;
  description: string;
  duration: number;
  price: number;
  treatment_id: string;
  professionals: string[];
};

export default function TreatmentPageAdmin() {
  const route = useRoute();
  const { name, description, duration, price, treatment_id } = route.params as RouteParams;
  const { professionals } = route.params as RouteParams;
  const [nameInputValue, setNameInputValue] = useState(name);
  const [descriptionInputValue, setDescriptionInputValue] = useState(description);
  const [durationInputValue, setDurationInputValue] = useState(duration.toString());
  const [priceInputValue, setPriceInputValue] = useState(formatToCurrency((price * 100).toString()));
  const {showToast} = useToast();
  const navigation = useNavigation();

  async function handleEdit() {
    if (!name.trim() || !description.trim()) {
      showToast('Por favor, preencha todos os campos', 'error');
      return;
    }
    
    const response = await treatmentsService.editTreatment(treatment_id, {
      name: nameInputValue.trim(),
      description: descriptionInputValue.trim(),
      duration: Number(durationInputValue),
      price: parseCurrencyToNumber(priceInputValue),
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
              <View className="flex-row justify-between items-end mb-4 gap-4">
                <View className="flex-1">
                  <Text className="text-lg font-medium mb-2 text-gray-700">
                    Nome do Tratamento
                  </Text>
                  <TextInput
                    className="bg-gray-100 p-4 rounded-2xl text-lg font-roboto border border-gray-200"
                    placeholder="Digite o nome do tratamento"
                    placeholderTextColor="#999"
                    value={nameInputValue}
                    onChangeText={setNameInputValue}
                  />
                </View>
                <View>
                  <Text className="text-lg font-medium mb-2 text-gray-700">
                    Duração
                  </Text>
                  <View className="flex-row items-center gap-1 border-b border-gray-200">
                    <TextInput
                      className="bg-transparent w-24 text-lg font-roboto "
                      keyboardType="number-pad"
                      placeholder="0"
                      placeholderTextColor="#999"
                      textAlign="right"
                      value={durationInputValue}
                      onChangeText={setDurationInputValue}
                    />
                    <Text className="text-lg font-semibold text-gray-500">Minutos</Text>
                  </View>
                </View>
              </View>
  
              <View className="mb-4">
                <Text className="text-lg font-medium mb-2 text-gray-700">
                  Descrição
                </Text>
                <TextInput
                  className="bg-gray-100 p-4 rounded-2xl text-lg font-roboto h-40 border border-gray-200"
                  style={{ textAlignVertical: "top" }}
                  placeholder="Digite a descrição do tratamento"
                  placeholderTextColor="#999"
                  multiline
                  value={descriptionInputValue}
                  onChangeText={setDescriptionInputValue}
                />
              </View>
  
              <View>
                  <Text className="text-lg font-medium mb-2 text-gray-700">
                    Preço
                  </Text>
                  <View className="flex-row items-center gap-1 border-b border-gray-200">
                    <TextInput
                      className="bg-transparent w-full text-xl font-roboto "
                      keyboardType="number-pad"
                      placeholder="0,00"
                      placeholderTextColor="#999"
                      value={priceInputValue}
                      onChangeText={text => setPriceInputValue(formatToCurrency(text))}
                    />
                  </View>
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
