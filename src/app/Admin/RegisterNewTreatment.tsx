import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "@/components/Header";
import { Button } from "@/components/Button";
import { PersonList } from "@/components/PersonList";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { treatmentsService } from "@/services/treatments";
import { useToast } from "@/contexts/ToastContext";

type RouteParams = {
  professionals: string[];
};

export default function RegisterNewTreatment() {
  const route = useRoute();
  const { professionals } = route.params as RouteParams;
  const [boundProfessionals, setBoundProfessionals] = useState(professionals);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const {showToast} = useToast()
  const navigation = useNavigation();

  async function handleCreate() {
    if (!name.trim() || !description.trim()) {
      showToast('Por favor, preencha todos os campos', 'error');
      return;
    }
    
    const response = await treatmentsService.createTreatment({
      name: name.trim(),
      description: description.trim(),
      professionalIds: [],
    })
    if(response){
      showToast('Tratamento cadastrado com sucesso!', 'success');
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
            Cadastrar Tratamento
          </Text>

          <View className="space-y-4">
            <View>
              <Text className="text-base font-medium mb-2 text-gray-700">Nome do Tratamento</Text>
              <TextInput
                className="bg-gray-100 p-4 rounded-2xl text-base font-roboto border border-gray-200"
                placeholder="Digite o nome do tratamento"
                placeholderTextColor="#999"
                value={name}
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
                value={description}
                onChangeText={setDescription}
              />
            </View>

            {boundProfessionals.length > 0 && (
              <View className="mt-4">
                <Text className="text-xl font-semibold mb-4">
                  Profissionais Vinculados
                </Text>
                <FlatList
                  data={boundProfessionals}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <View className="py-4 px-6 rounded-xl flex-row justify-between items-center bg-gray-50 mb-2">
                      <Text className="text-lg">{item}</Text>
                      <TouchableOpacity 
                        onPress={() => {
                          setBoundProfessionals(prevState => 
                            prevState.filter(name => name != item)
                          )
                        }}
                        className="p-2"
                      >
                        <Ionicons
                          name="remove-circle-outline"
                          size={28}
                          color={"#EF4444"}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View className="px-4 pb-8 pt-4 bg-white">
        <Button 
          title="Confirmar" 
          onPress={handleCreate} 
          className="w-full"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
