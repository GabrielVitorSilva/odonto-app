import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import BottomDrawer from "@/components/BottomDrawer";
import { useState } from "react";
import Header from "@/components/Header";
import { LocaleConfig } from "react-native-calendars";
import { Button } from "@/components/Button";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/contexts/AuthContext";

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
  const {clientSelected, professionalSelected, treatmentSelected} = useAuth();
  console.log("Client Selected: ", clientSelected);
  console.log("Professional Selected: ", professionalSelected);
  console.log("Treatment Selected: ", treatmentSelected);
  const navigation = useNavigation();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState<string | null>("08:00");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const availableHours = [
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
  ];

  return (
    <View className="flex-1 bg-white">
      <Text className="text-4xl text-center mt-6 mb-4">Selecione data e hora</Text>
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

        <Picker
          selectedValue={selectedHour}
          onValueChange={(value) => {
            setSelectedHour(value);
          }}
          style={{ height: 50, backgroundColor: "#f3f4f6" }}
          itemStyle={{ backgroundColor: "#f3f4f6" }}
        >
          {availableHours.map((hour) => (
            <Picker.Item label={hour} value={hour} />
          ))}
        </Picker>
      </View>

      <Button
        className="mt-8"
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
