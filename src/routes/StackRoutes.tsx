import ConsultationsPageAdmin from "@/app/Admin/ConsultationsPageAdmin";
import ConsultationPage from "@/app/Patients/ConsultationPage";
import HomeClient from "@/app//Patients/HomeClient";
import HomeAdmin from "@/app/Admin/HomeAdmin";
import Login from "@/app/Authentication/Login";
import Register from "@/app/Authentication/Register";
import UseTerms from "@/app/Authentication/UseTerms";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TreatmentsScreen from "@/app/Treatments";
import HomeProf from "@/app/Professional/HomeProf";
import ConsultationsPageProf from "@/app/Professional/ConsultationsPageProf";
import SelectClientAdmin from "@/app/Admin/SelectClientAdmin";
import SelectProfessionalAdmin from "@/app/Admin/SelectProfessionalAdmin";
import BindProfessionalAdmin from "@/app/Admin/BindProfessionalAdmin";
import SelectDateHourAdmin from "@/app/Admin/SelectDateHourAdmin";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="BindProfessionalAdmin"
        component={BindProfessionalAdmin}
      />
      <Stack.Screen
        name="SelectDateHourAdmin"
        component={SelectDateHourAdmin}
      />
      <Stack.Screen
        name="SelectProfessionalAdmin"
        component={SelectProfessionalAdmin}
      />
      <Stack.Screen name="SelectClientAdmin" component={SelectClientAdmin} />
      <Stack.Screen
        name="ConsultationsPageProf"
        component={ConsultationsPageProf}
      />
      <Stack.Screen name="HomeProf" component={HomeProf} />
      <Stack.Screen name="Treatments" component={TreatmentsScreen} />
      <Stack.Screen
        name="ConsultationsPageAdmin"
        component={ConsultationsPageAdmin}
      />
      <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
      <Stack.Screen name="ConsultationPage" component={ConsultationPage} />
      <Stack.Screen name="HomeClient" component={HomeClient} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="UseTerms" component={UseTerms} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
