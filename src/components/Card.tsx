import { View, Text, TouchableOpacity, Image } from "react-native";
import getImage from "@/theme/image";

type CardProps = {
  name: string;
  date?: string;
  hour?: string;
  upperText: string;
  lowerText?: string;
  status?: string;
  handlePress?: () => void;
  handleLongPress?: () => void;
  className?: string;
};

export default function Card({
  name,
  date,
  hour,
  upperText,
  lowerText,
  status = "",
  handlePress = () => {},
  handleLongPress = () => {},
  className,
}: CardProps) {
  const statusStyle =
    {
      SCHEDULED: {
        bg: "bg-app-light-yellow",
        textStyle: "text-app-yellow",
        text: "Agendada",
      },
      CANCELED: {
        bg: "bg-app-light-red",
        textStyle: "text-app-red",
        text: "Cancelada",
      },
      COMPLETED: {
        bg: "bg-app-light-blue",
        textStyle: "text-app-blue",
        text: "Finalizada",
      },
    }[status] || {};

  function displayText(text: string) {
      const WORD_LIMIT = 20;
      const words = text.trim().split(/\s+/);
      const isTruncated = words.length > WORD_LIMIT;
      const displayedText = isTruncated
        ? words.slice(0, WORD_LIMIT).join(" ") + "..."
        : text;
      
      return <Text>{displayedText}</Text>;
    
  }

  return (
    <TouchableOpacity
      className={`flex-row gap-3 mb-5 min-h-20 ${className || " "}`}
      onLongPress={handleLongPress}
      onPress={handlePress}
    >
      <Image
        source={getImage(name)}
        style={{ width: 48, height: 48, marginRight: 16, alignSelf: "center" }}
      />
      <View className="flex-1">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-lg">{name}</Text>
          {date && (
            <Text className="text-[#BDBDBD]">{`${date} - ${hour}`}</Text>
          )}
        </View>

        <View className="flex-row justify-between mb-2 items-center">
          <Text>{displayText(upperText)}</Text>
          <View className={`rounded-xl px-4 py-[2px] ${statusStyle.bg}`}>
            {status && (
              <Text className={`font-bold ${statusStyle.textStyle}`}>
                {statusStyle.text}
              </Text>
            )}
          </View>
        </View>
        {lowerText && displayText(lowerText)}
      </View>
    </TouchableOpacity>
  );
}
