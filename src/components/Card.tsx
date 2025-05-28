import { View, Text, Image } from "react-native";

type CardProps = {
  name: string;
  description?: string;
  patientName?: string;
  professionalName?: string;
  date: string;
  hour: string;
  status: string;
  type: "Admin" | "Client" | "Professional";
};

export default function Card({
  name,
  description,
  patientName,
  professionalName,
  date,
  hour,
  status,
  type,
}: CardProps) {
  const statusStyle = {
    Confirmado: {
      bg: "bg-[#badec4]",
      text: "text-app-green",
    },
    Pendente: {
      bg: "bg-[#eeedaa]",
      text: "text-app-yellow",
    },
    Cancelado: {
      bg: "bg-[#f0a8a8]",
      text: "text-app-red",
    },
  }[status] || {
    bg: "bg-gray-200",
    text: "text-gray-700",
  };

  function renderUpperText(): string | null {
    switch (type) {
      case "Admin":
        return `Paciente: ${patientName}`;

      case "Client":
        return "Procedimentos";

      case "Professional":
        return "Cliente: ";
    }
  }

  function renderLowerText(): string {
    switch (type) {
      case "Admin":
        return `Profissional: ${professionalName}`;

      case "Client":
        return `${description}`;

      case "Professional":
        return `${patientName}`;
    }
  }

  return (
    <View className="flex-row gap-4 mb-5">
      <Image
        source={require("../assets/tsunami.jpg")}
        className="w-[50px] h-[50px] rounded"
      />
      <View className="flex-1">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-lg">{name}</Text>
          <Text className="text-[#BDBDBD]">
            {date} - {hour}
          </Text>
        </View>

        <View className="flex-row justify-between mb-2 items-center">
          <Text>{renderUpperText()}</Text>
          <View className={`rounded-[10px] px-1 py-[2px] ${statusStyle.bg}`}>
            <Text className={`font-bold ${statusStyle.text}`}>{status}</Text>
          </View>
        </View>

        <Text>{renderLowerText()}</Text>
      </View>
    </View>
  );
}