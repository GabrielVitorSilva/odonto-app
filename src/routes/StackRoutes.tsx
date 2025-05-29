import ConsultationsPageAdmin from "@/app/Admin/ConsultationsPageAdmin";
import ConsultationPage from "@/app/ConsultationPage";
import HomeClient from "@/app//Patients/HomeClient";
import HomeAdmin from "@/app/Admin/HomeAdmin";
import Login from "@/app/Authentication/Login";
import Register from "@/app/Authentication/Register";
import UseTerms from "@/app/Authentication/UseTerms";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TreatmentsScreen from "@/app/Treatments";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Treatments" component={TreatmentsScreen}/>
      <Stack.Screen name="ConsultationsPageAdmin" component={ConsultationsPageAdmin}/>
      <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
      <Stack.Screen name="ConsultationPage" component={ConsultationPage} />
      <Stack.Screen name="HomeClient" component={HomeClient} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="UseTerms" component={UseTerms} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
