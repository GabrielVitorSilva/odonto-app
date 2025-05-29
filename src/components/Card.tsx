import { View, Text, Image } from "react-native";

type CardProps = {
  name: string;
  date?: string;
  hour?: string;
  upperText: string;
  lowerText?: string;
  status?: string;
};

export default function Card({
  name,
  date,
  hour,
  upperText,
  lowerText,
  status = "NaN",
}: CardProps) {
  const statusStyle =
    {
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
    }[status] || {};

  return (
    <View className="flex-row gap-4 mb-5">
      <Image
        source={require("../assets/tsunami.jpg")}
        className="w-[50px] h-[50px] rounded"
      />
      <View className="flex-1">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-lg">{name}</Text>
          {date && (
            <Text className="text-[#BDBDBD]">{`${date} - ${hour}`}</Text>
          )}
        </View>

        <View className="flex-row justify-between mb-2 items-center">
          <Text>{upperText}</Text>
          <View className={`rounded-[10px] px-1 py-[2px] ${statusStyle.bg}`}>
            {status && (
              <Text className={`font-bold ${statusStyle.text}`}>{status}</Text>
            )}
          </View>
        </View>
        {lowerText && <Text>{lowerText}</Text>}
      </View>
    </View>
  );
}
