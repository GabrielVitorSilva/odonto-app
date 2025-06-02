import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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

export default function SelectDateHourAdmin() {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const availableHours = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

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

      <View className="mt-10 mx-4 border border-app-blue rounded-md p-4 shadow">
        <Text className="text-app-blue text-sm -mt-5 mb-2 px-1 bg-white rounded w-fit">
          Horário
        </Text>
        <Text className="mb-4">Selecione um horário:</Text>

        <ScrollView className="bg-violet-50 rounded-md max-h-40">
          {availableHours.map((hour) => (
            <TouchableOpacity
              key={hour}
              className={`py-2 px-4 ${
                selectedHour === hour ? "bg-app-light-blue rounded" : ""
              }`}
              onPress={() => setSelectedHour(hour)}
            >
              <Text className="text-lg">{hour}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Button
        className="mt-30"
        title="Agendar Consulta"
        onPress={() => {
          setShowDrawer(true);
        }}
      />
      <BottomDrawer
        title="Agendar consulta"
        content={
          <Text className="text-center mb-6">
            Deseja realmente agendar uma{" "}
            <Text className="text-app-blue font-semibold">Clareamento</Text>{" "}
            para{" "}
            <Text className="text-app-blue font-semibold">
              Victoria Robertson
            </Text>
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
