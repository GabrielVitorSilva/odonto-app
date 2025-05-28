import { View, Text, Image } from "react-native";

type CardProps = {
  name: string;
  description: string;
  date: string;
  status: string;
};

export default function Card({ name, description, date, status }: CardProps) {
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

  return (
    <View className="flex-row gap-4 mb-5">
      <Image
        source={require("../assets/tsunami.jpg")}
        className="w-[50px] h-[50px] rounded"
      />
      <View className="flex-1">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-lg">{name}</Text>
          <Text className="text-[#BDBDBD]">{date}</Text>
        </View>

        <View className="flex-row justify-between mb-2 items-center">
          <Text>Procedimentos: </Text>
          <View className={`rounded-[10px] px-1 py-[2px] ${statusStyle.bg}`}>
            <Text className={`font-bold ${statusStyle.text}`}>{status}</Text>
          </View>
        </View>

        <Text>{description}</Text>
      </View>
    </View>
  );
}
