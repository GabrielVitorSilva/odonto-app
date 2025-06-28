import Header from "@/components/Header";
import { formatToCurrency } from "@/utils/currency";
import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";

type RouteParams = {
  name: string;
  description: string;
  duration: number;
  price: number;
};

export default function TreatmentPagePatient() {
  const route = useRoute();
  const { name, description, duration, price } = route.params as RouteParams;

  return (
    <View className="flex-1">
      <Header />
      <View className="">
        <Text className="px-5 text-3xl font-semibold mb-6">Detalhes do tratamento</Text>
        
        <View className="py-4 px-5 border-b-2 border-t-2 border-neutral-300">
          <Text className="text-2xl font-semibold">Descrição</Text>
          <Text className="text-xl">{description}</Text>
        </View>

        <View className="py-4 px-5 border-b-2 border-neutral-300">
            <Text className="font-semibold text-2xl">Duração</Text>
            <Text className="text-xl">{duration} minutos</Text>
        </View>
        
        <View className="py-4 px-5 border-b-2 border-neutral-300">
            <Text className="font-semibold text-2xl">Preço</Text>
            <Text className="text-xl">{formatToCurrency((price*100).toString())}</Text>
        </View>

      </View>
    </View>
  );
}

