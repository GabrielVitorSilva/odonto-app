import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import BottomDrawer from "@/components/BottomDrawer";
import { useCallback, useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/Button";
import { treatmentsService } from "@/services/treatments";
import { consultationService } from "@/services/consultations";
import { useAuth } from "@/contexts/AuthContext";
import { Picker } from "@react-native-picker/picker";
import { useToast } from "@/contexts/ToastContext";
import { useNavigation } from "@react-navigation/native";

const AVAILABLE_HOURS = [
  "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00",
];

const TRIAGEM_TREATMENT_ID = 'ca43f3d3-0195-4177-892e-1958f06c2dac';

export default function SelectDatePatient() {
  const navigation = useNavigation();
  const { profile } = useAuth();
  const { showToast } = useToast();

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string>(AVAILABLE_HOURS[0]);
  const [professionalAvailable, setProfessionalAvailable] = useState<any>(null);

  const checkProfessionalAvailability = async (professional: any, date: string) => {
    const consultations = await consultationService.listConsultationsByProfessional(professional.professionalId);
    return !consultations.consultations.some(
      (consultation: any) => {
        const formattedDay = consultation.dateTime.split("T")[0]
        const formattedTime = consultation.dateTime.split("T")[1].slice(0, 5)
        return formattedDay === date && formattedTime === selectedHour
      }
    );
  };

  const findAvailableProfessional = async (date: string) => {
    try {
      const professionals = await treatmentsService.listProfessionals();
      
      for (const professional of professionals) {
        const isAvailable = await checkProfessionalAvailability(professional, date);
        if (isAvailable) {
          return professional;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar profissionais:', error);
      return null;
    }
  };

  const handleDayPress = async (day: any) => {
    const selectedDate = new Date(day.dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      showToast('Não é possível selecionar uma data passada', 'error');
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

    const availableProfessional = await findAvailableProfessional(selectedDay);
    setProfessionalAvailable(availableProfessional);
    
    if (!availableProfessional) {selectedDay
      showToast('Nenhum profissional disponível para este horário', 'error');
    }
  }

  const handleScheduleConsultation = async () => {
    if (!profile || !professionalAvailable || !selectedDay) {
      showToast('Dados incompletos para agendamento', 'error');
      return;
    }

    try {
      // Vincular profissional ao tratamento
      await treatmentsService.addUniqueProfessionalFromTreatment(
        TRIAGEM_TREATMENT_ID,
        professionalAvailable.professionalId
      );

      // Agendar consulta
      await consultationService.scheduleConsult({
        clientId: profile.user.profileData.id,
        professionalId: professionalAvailable.professionalId,
        dateTime: `${selectedDay}T${selectedHour}:00.000Z`,
        treatmentId: TRIAGEM_TREATMENT_ID,
      });

      showToast('Consulta agendada com sucesso!', 'success');
      navigation.navigate('HomeClient');
      setShowDrawer(false);
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      showToast('Erro ao agendar consulta', 'error');
    }
  };

  const renderTimePicker = () => (
    <View className="mt-10 mx-4 border border-app-blue rounded-md p-4 shadow">
      <Text className="text-app-blue text-sm -mt-5 mb-2 px-1 bg-white rounded w-fit">
        Horário
      </Text>
      <Text className="mb-4">Selecione um horário:</Text>

      <Picker
        selectedValue={selectedHour}
        onValueChange={setSelectedHour}
        style={{ height: 50, backgroundColor: "#f3f4f6" }}
        itemStyle={{ backgroundColor: "#f3f4f6" }}
      >
        {AVAILABLE_HOURS.map((hour, index) => (
          <Picker.Item key={index} label={hour} value={hour} />
        ))}
      </Picker>
    </View>
  );

  return (
    <View className="flex-1">
      <Header className="bg-app-blue" contentColor="white" />
      
      <Calendar
        current={new Date().toISOString().split("T")[0]}
        onDayPress={handleDayPress}
        minDate={new Date().toISOString().split("T")[0]}
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

      {renderTimePicker()}

      <Button
        className="mt-auto mb-16 mx-4"
        title="Agendar Consulta"
        onPress={handleButtonPress}
      />

      <BottomDrawer
        title="Agendar consulta"
        content={
          <Text className="text-center mb-6">
            Deseja realmente agendar uma{" "}
            <Text className="text-app-blue font-semibold">Triagem</Text>
            {professionalAvailable && ` com ${professionalAvailable.name}`} para {selectedHour}?
          </Text>
        }
        handlePress={handleScheduleConsultation}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        buttonTitle="Agendar agora"
      />
    </View>
  );
}