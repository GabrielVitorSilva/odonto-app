import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import BottomDrawer from "@/components/BottomDrawer";
import { useState } from "react";
import Header from "@/components/Header";
import { LocaleConfig } from "react-native-calendars";
import { Button } from "@/components/Button";

LocaleConfig.locales["pt"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
};

LocaleConfig.defaultLocale = "pt";

export default function SelectDatePatient() {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  return (
    <View className="flex-1">
      <Header className="bg-app-blue" contentColor="white" />
      <Calendar
        current={new Date().toISOString().split("T")[0]}
        onDayPress={(day) => setSelectedDay(day.dateString)}
        markedDates={
          selectedDay
            ? {
                [selectedDay]: {
                  selected: true,
                  selectedColor: "#3B82F6",
                },
              }
            : {}
        }
        theme={{
          arrowColor: "#3B82F6",
          selectedDayBackgroundColor: "#3B82F6",
        }}
      />
      <Button
        className="mt-30"
        title="Agendar"
        onPress={() => {
          setShowDrawer(true);
        }}
      />
      <BottomDrawer
        title="Agendar consulta"
        content={
          <Text className="text-center mb-6">
            Deseja realmente agendar uma{" "}
            <Text className="text-app-blue font-semibold">Triagem</Text>
            ?
          </Text>
        }
        handlePress={() => {}}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        buttonTitle="Agendar agora"
      />
    </View>
  );
}