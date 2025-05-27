import Teste1 from "@/app/teste";
import Teste2 from "@/app/teste2";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Teste1"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Teste1" component={Teste1} />
      <Stack.Screen name="Teste2" component={Teste2} />
    </Stack.Navigator>
  );
}