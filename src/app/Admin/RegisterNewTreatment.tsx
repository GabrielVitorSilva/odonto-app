import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Header from "@/components/Header";
import { Button } from "@/components/Button";
import { PersonList } from "@/components/PersonList";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";

type RouteParams = {
  professionals: String[];
};

export default function RegisterNewTreatment() {
  const route = useRoute();
  const { professionals } = route.params as RouteParams;

  const [boundProfessionals, setBoundProfessionals] = useState(professionals);

  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <Header />

      <View className="px-4 flex-1">
        <Text className="text-3xl font-semibold mb-14 text-center">
          Cadastrar Tratamento
        </Text>
        <TextInput
          className="bg-gray-100 p-4 rounded-2xl text-base mb-3 font-roboto"
          placeholder="Nome"
          placeholderTextColor="#999"
        />
        <TextInput
          className="bg-gray-100 p-4 rounded-2xl text-base mb-10 font-roboto h-40"
          style={{ textAlignVertical: "top" }}
          placeholder="Descrição"
          placeholderTextColor="#999"
          multiline
        />

        {professionals.length > 0 && (
          <View className="">
            <Text className="text-xl font-semibold">
              Profissionais Vinculados
            </Text>
            <FlatList
              data={boundProfessionals}
              renderItem={({ item, index }) => (
                <View className="py-5 px-8 rounded-xl flex-row justify-between">
                  <Text className="text-xl">{item}</Text>
                  <TouchableOpacity onPress={() => {}}>
                    <Ionicons
                      name="remove-circle-outline"
                      size={28}
                      color={"black"}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}

        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => navigation.navigate("BindProfessionalAdmin")}
        >
          <Ionicons name="add" color={"#38ABE2"} size={32} />
          <Text className="text-app-blue font-semibold text-lg ml-2">
            Vincular Tratamento a Funcionário
          </Text>
        </TouchableOpacity>
      </View>
      <Button title="Confirmar" onPress={() => {}} className="mb-16" />
    </View>
  );
}
