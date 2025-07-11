import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import BottomDrawer from "@/components/BottomDrawer";
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/Button";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/contexts/AuthContext";
import { consultationService } from "@/services/consultations";
import { useToast } from "@/contexts/ToastContext";

export default function SelectDateHourAdmin() {
  const { clientSelected, professionalSelected, treatmentSelected } = useAuth();
  const { showToast } = useToast();
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

  async function handleSchedule() {
    const schedule = await consultationService.scheduleConsult({
      clientId: clientSelected?.clientId || "",
      professionalId: professionalSelected?.professionalId || "",
      treatmentId: treatmentSelected?.id || "",
      dateTime: `${selectedDay}T${selectedHour}:00.000Z`,
    });
    showToast("Consulta agendada com sucesso!", "success");
    setShowDrawer(false);
    navigation.navigate("HomeAdmin");
  }

  const checkProfessionalAvailability = async (
    professional: any,
    date: string
  ) => {
    const consultations =
      await consultationService.listConsultationsByProfessional(
        professional.professionalId
      );
    return !consultations.consultations.some((consultation: any) => {
      const formattedDay = consultation.dateTime.split("T")[0];
      const formattedTime = consultation.dateTime.split("T")[1].slice(0, 5);
      return formattedDay === date && formattedTime === selectedHour;
    });
  };

  const handleDayPress = async (day: any) => {
    const selectedDate = new Date(day.dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      showToast("Não é possível selecionar uma data passada", "error");
      return;
    }

    setSelectedDay(day.dateString);
  };

  const handleButtonPress = async () => {
    if (!selectedDay) {
      showToast("Selecione uma data", "error");
      setShowDrawer(false);
      return;
    }

    const isAvailable = await checkProfessionalAvailability(
      professionalSelected,
      selectedDay
    );

    if (!isAvailable) {
      showToast(
        "Profissional selecionado não disponível para este horário",
        "error"
      );
      return;
    }

    setShowDrawer(true);
  };

  return (
    <View className="flex-1 bg-white">
      <Header />
      <View className="flex-1 px-4 py-4">
        <Text className="text-center text-3xl font-semibold mb-8">
          Selecione data e horário
        </Text>
        <Calendar
          minDate={new Date().toISOString().split("T")[0]}
          current={new Date().toISOString().split("T")[0]}
          onDayPress={handleDayPress}
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


          <Picker
            selectedValue={selectedHour}
            onValueChange={(value) => {
              setSelectedHour(value);
            }}
            style={{ height: 50, backgroundColor: "#FFFFFF", color: "#111" }}
            itemStyle={{ color: "#000" }}
            dropdownIconColor="#111"
          >
            {availableHours.map((hour, index) => (
              <Picker.Item label={hour} key={index} value={hour} />
            ))}
          </Picker>
      </View>

      <Button
        className="mt-auto mb-10"
        title="Agendar Consulta"
        onPress={handleButtonPress}
      />
      <BottomDrawer
        title="Agendar consulta"
        content={
          <Text className="text-center mb-6">
            Deseja realmente agendar {``}
            <Text className="text-app-blue font-semibold">{`${treatmentSelected?.name}`}</Text>{" "}
            para{" "}
            <Text className="text-app-blue font-semibold">
              {`${clientSelected?.name}`}
            </Text>
            ?
          </Text>
        }
        handlePress={() => {
          handleSchedule();
        }}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        buttonTitle="Agendar agora"
      />
    </View>
  );
}

