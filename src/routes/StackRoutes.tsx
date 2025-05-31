import React, { Fragment } from "react";
import ConsultationsPageAdmin from "@/app/Admin/ConsultationsPageAdmin";
import ConsultationPage from "@/app/Patients/ConsultationPage";
import ConsultationPageAdmin from "@/app/Admin/ConsultationPageAdmin";
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
import RegisterNewUserAdmin from "@/app/Admin/RegisterNewUserAdmin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";
import { colors } from "@/theme/colors";
import RegisterAnotherUser from "@/app/Admin/RegisterAnotherUser";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  const { token, isLoading, profile } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator
          size="large"
          className="self-center"
          color={colors.blue}
        />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!token ? (
        <>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UseTerms" component={UseTerms} />
        </>
      ) : profile?.user.role === "CLIENT" ? (
        <>
          <Stack.Screen name="HomeClient" component={HomeClient} />
          <Stack.Screen name="ConsultationPage" component={ConsultationPage} />
          <Stack.Screen name="Treatments" component={TreatmentsScreen} />
        </>
      ) : profile?.user.role === "ADMIN" ? (
        <>
          <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
          <Stack.Screen name="RegisterAnotherUser" component={RegisterAnotherUser} />
          <Stack.Screen name="ConsultationsPageAdmin" component={ConsultationsPageAdmin} />
          <Stack.Screen name="ConsultationPageAdmin" component={ConsultationPageAdmin} />
          <Stack.Screen name="SelectClientAdmin" component={SelectClientAdmin} />
          <Stack.Screen name="SelectProfessionalAdmin" component={SelectProfessionalAdmin} />
          <Stack.Screen name="BindProfessionalAdmin" component={BindProfessionalAdmin} />
          <Stack.Screen name="SelectDateHourAdmin" component={SelectDateHourAdmin} />
          <Stack.Screen name="RegisterNewUserAdmin" component={RegisterNewUserAdmin} />
          <Stack.Screen name="Treatments" component={TreatmentsScreen} />
        </>
      ) : profile?.user.role === "PROFESSIONAL" ? (
        <>
          <Stack.Screen name="HomeProf" component={HomeProf} />
          <Stack.Screen name="ConsultationsPageProf" component={ConsultationsPageProf} />
          <Stack.Screen name="ConsultationPage" component={ConsultationPage} />
        </>
      ) : null}
    </Stack.Navigator>
  );
}
