import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import BottomDrawer from "@/components/BottomDrawer";
import { useCallback, useState } from "react";
import Header from "@/components/Header";
import { LocaleConfig } from "react-native-calendars";
import { Button } from "@/components/Button";
import { treatmentsService } from "@/services/treatments";
import { consultationService } from "@/services/consultations";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "@/contexts/AuthContext";
import { Picker } from "@react-native-picker/picker";
import { useToast } from "@/contexts/ToastContext";

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
  const { profile } = useAuth()
  const { showToast } = useToast()

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string>("08:00");
  const [professionalAvailable, setProfessionalAvailable] = useState<any>(null);
  
  const availableHours = [
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
  ];

  async function checkAvailableProfessionals(date: string) {
    try {
      const professionals = await treatmentsService.listProfessionals();
      
      for (const professional of professionals) {
        const consultations = await consultationService.listConsultationsByProfessional(professional.professionalId);
        
        const hasConsultationOnDate = consultations.consultations.some(
          (consultation: any) => consultation.dateTime.split('T')[0] === date
        );
        
        if (!hasConsultationOnDate) {
          setProfessionalAvailable(professional);
          return;
        }
      }
      
      console.error('Nenhum profissional disponível para esta data');
      setProfessionalAvailable(null);
    } catch (error) {
      console.error('Erro ao verificar profissionais disponíveis:', error);
      setProfessionalAvailable(null);
    }
  }

  const handleDayPress = (day: any) => {
    setSelectedDay(day.dateString);
    checkAvailableProfessionals(day.dateString);
  };

  return (
    <View className="flex-1">
      <Header className="bg-app-blue" contentColor="white" />
      <Calendar
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
          {availableHours.map((hour, index) => (
            <Picker.Item label={hour} key={index} value={hour} />
          ))}
        </Picker>
      </View>

      <Button
        className="mt-auto mb-16 mx-4"
        title="Agendar Consulta"
        onPress={() => {
          if (professionalAvailable) {
            setShowDrawer(true);
          } else {
            showToast('Selecione uma data com profissionais disponíveis', 'error');
          }
        }}
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
        handlePress={async () => {
          if(!profile) return
          try {
            console.log({
              clientId: profile?.user.User.id,
              professionalId: professionalAvailable.professionalId,
              dateTime: `${selectedDay}T${selectedHour}:00.000Z`,
              treatmentId: 'ca43f3d3-0195-4177-892e-1958f06c2dac', 
            });
            const vincule = await treatmentsService.addUniqueProfessionalFromTreatment(
              'ca43f3d3-0195-4177-892e-1958f06c2dac', 
              professionalAvailable.professionalId
            )
            const res = await consultationService.scheduleConsult({
              clientId: profile?.user.profileData.id,
              professionalId: professionalAvailable.professionalId,
              dateTime: `${selectedDay}T${selectedHour}:00.000Z`,
              treatmentId: 'ca43f3d3-0195-4177-892e-1958f06c2dac', 
            })
            showToast('Consulta agendada com sucesso!', 'success');
            setShowDrawer(false);
          } catch (error) {
            showToast('Erro ao agendar consulta', 'error');
          }
        }}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        buttonTitle="Agendar agora"
      />
    </View>
  );
}