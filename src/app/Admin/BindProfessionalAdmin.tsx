import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { PersonList } from "@/components/PersonList";
import { View, Text } from "react-native";
import BottomDrawer from "@/components/BottomDrawer";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/@types/navigation";
import { treatmentsService } from "@/services/treatments";
import type { IUser, ProfessionalUser } from "@/services/types/treatments";

type RouteParams =
  | {
      alreadyBound: string[];
      returnTo: {
        screen: 'RegisterNewTreatment';
      };
    }
  | {
      alreadyBound: string[];
      returnTo: {
        screen: 'TreatmentPageAdmin';
        params: RootStackParamList['TreatmentPageAdmin'];
      };
    };

export default function BindProfessionalAdmin() {
  const route = useRoute();
  const { alreadyBound, returnTo } = route.params as RouteParams;

  const [showDrawer, setShowDrawer] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [noSelected, setNoSelected] = useState(false);
  const [professionals, setProfessionals] = useState<ProfessionalUser[]>([]);
  const navigation = useNavigation();

  async function fetchProfessionals() {
    const data = await treatmentsService.listProfessionals()
    setProfessionals(data);
  }

  useEffect(() => {
    fetchProfessionals();
  },[])

  const handleBind = () => {
    if (selected.length > 0) {
      setShowDrawer(true);
    } else {
      setNoSelected(true);
    }
  };

  const handleConfirmation = () => {
  if (returnTo.screen === "RegisterNewTreatment") {
    navigation.navigate("RegisterNewTreatment", {
      professionals: [...alreadyBound, ...selected],
    });
  } else if (returnTo.screen === "TreatmentPageAdmin") {
    navigation.navigate("TreatmentPageAdmin", {
      ...returnTo.params,
      professionals: [...alreadyBound, ...selected],
    });
  }
};


  const content = (
    <Text className="text-center">
      Deseja realmente vincular{" "}
      <Text className="text-app-blue font-semibold">estes odontólogos</Text> com
      o <Text className="text-app-blue font-semibold">tratamento</Text>?
    </Text>
  );

  return (
    <View className="flex-1">
      <Header />
      <View className="flex-1 px-4 py-4">
        <Text className="text-center text-3xl font-semibold">Odontólogos</Text>

        <View className="flex-1">
          <PersonList
            list={professionals}
            multiselection
            selected={selected}
            setSelected={setSelected}
          />
        </View>
      </View>

      <View className="mb-16">
        <Button title="Vincular Tratamento" onPress={handleBind} />
        {noSelected && (
          <Text className="text-lg text-app-red text-center mt-3">
            Selecione pelo menos um Odontólogo
          </Text>
        )}
      </View>

      <BottomDrawer
        title="Vincular Funcionário?"
        content={content}
        buttonTitle="Vincular agora"
        handlePress={handleConfirmation}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
      />
    </View>
  );
}
