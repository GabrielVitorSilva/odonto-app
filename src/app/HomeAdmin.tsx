import { View, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeAdmin() {
  return (
    <View>
      <View className="bg-app-blue pb-[150px] mb-[60px]">
        <View className="flex-row items-center justify-between p-5">
          <Text className="text-white text-4xl font-bold w-30"></Text>
          <Text className="text-white text-4xl font-bold ">Administrador</Text>
          <TouchableOpacity>
            <Text className="text-white text-2xl text-right w-30">Sair</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../assets/tsunami.jpg")}
          className="w-40 h-40 rounded-full border-[4px] border-white self-center absolute -bottom-[45px]"
        />
      </View>

      <Text className="text-center text-3xl font-semibold mb-[25px]">
        Marina Dias
      </Text>

      <View className="p-5">
        <Text className="text-app-blue mb-5 text-center text-lg font-semibold pb-2 border-b-hairline border-b-gray-300">
          Menu
        </Text>

        <TouchableOpacity className="flex-row gap-6 items-center mb-3">
          <Ionicons name="folder" size={48} />
          <Text className="font-bold">Consultas</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row gap-6 items-center mb-3">
          <Ionicons name="medkit" size={48} />
          <Text className="font-bold">Tratamentos</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row gap-6 items-center mb-3">
          <Ionicons name="person-add" size={48} />
          <Text className="font-bold">Cadastrar usuário</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row gap-6 items-center mb-3">
          <Ionicons name="medical" size={48} />
          <Text className="font-bold">Odontólogos</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row gap-6 items-center mb-3">
          <Ionicons name="person" size={48} />
          <Text className="font-bold">Clientes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
