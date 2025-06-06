import Header from "@/components/Header";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/Button";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import BottomDrawer from "@/components/BottomDrawer";

export default function TreatmentPageProf() {
  return (
    <View className="flex-1">
      <Header className="bg-app-blue" contentColor="white" />
      <View className="flex-1 px-4 py-4">
        <Text className="text-3xl font-semibold mb-4">Clareamento</Text>
        <Text>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</Text>
        <Text>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</Text>
        <Text>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</Text>
        <Text>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</Text>
      </View>
    </View>
  );
}
