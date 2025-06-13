import { colors } from "@/theme/colors";
import * as React from "react";
import { View, ActivityIndicator } from "react-native";

interface Loading {}

export default function Loading() {
  return (
    <View className="flex-1 justify-center items-center mt-10">
      <ActivityIndicator size="large" color={colors.blue} />
    </View>
  );
}
