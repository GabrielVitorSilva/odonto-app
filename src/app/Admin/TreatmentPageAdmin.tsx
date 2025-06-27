import Header from "@/components/Header";
import React from "react";
import { Text, View } from "react-native";
import {
  useRoute,
  useNavigation,
} from "@react-navigation/native";

type RouteParams = {
  name: string;
  description: string;
  treatment_id: string;
  professionals: string[];
};

export default function TreatmentPageAdmin() {
  const route = useRoute();
  const { name, description, treatment_id } = route.params as RouteParams;
  const navigation = useNavigation();

  return (
    <View className="flex-1">
      <Header
        className="bg-app-blue"
        contentColor="white"
        handleGoBack={() => navigation.navigate("TreatmentsAdmin")}
      />
      <View className="flex-1 px-4 py-4">
        <Text className="text-3xl font-semibold mb-4">{name}</Text>
        <Text>{description}</Text>
      </View>
    </View>
  );
}
