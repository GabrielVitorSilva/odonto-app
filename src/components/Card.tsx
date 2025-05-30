import { View, Text, TouchableOpacity } from "react-native";

type CardProps = {
  name: string;
  date?: string;
  hour?: string;
  upperText: string;
  lowerText?: string;
  status?: string;
  handlePress?: () => void;
};

export default function Card({
  name,
  date,
  hour,
  upperText,
  lowerText,
  status = "",
  handlePress = () => {},
}: CardProps) {
  const statusStyle =
    {
      Confirmado: {
        bg: "bg-app-light-green",
        text: "text-app-green",
      },
      Pendente: {
        bg: "bg-app-light-yellow",
        text: "text-app-yellow",
      },
      Cancelado: {
        bg: "bg-app-light-red",
        text: "text-app-red",
      },
      Finalizado: {
        bg: "bg-app-light-blue",
        text: "text-app-blue",
      },
    }[status] || {};

  return (
    <TouchableOpacity className="flex-row gap-4 mb-5" onPress={handlePress}>
      <View
        className={`w-12 h-12 rounded-xl bg-app-blue items-center justify-center mr-4`}
      ></View>
      <View className="flex-1">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-lg">{name}</Text>
          {date && (
            <Text className="text-[#BDBDBD]">{`${date} - ${hour}`}</Text>
          )}
        </View>

        <View className="flex-row justify-between mb-2 items-center">
          <Text>{upperText}</Text>
          <View className={`rounded-xl px-4 py-[2px] ${statusStyle.bg}`}>
            {status && (
              <Text className={`font-bold ${statusStyle.text}`}>{status}</Text>
            )}
          </View>
        </View>
        {lowerText && <Text>{lowerText}</Text>}
      </View>
    </TouchableOpacity>
  );
}
