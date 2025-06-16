import React, { Fragment, useEffect, useState } from "react";
import ConsultationsPageAdmin from "@/app/Admin/ConsultationsPageAdmin";
import ConsultationPage from "@/app/Patients/ConsultationPage";
import ConsultationPageAdmin from "@/app/Admin/ConsultationPageAdmin";
import HomeClient from "@/app//Patients/HomeClient";
import HomeAdmin from "@/app/Admin/HomeAdmin";
import Login from "@/app/Authentication/Login";
import Register from "@/app/Authentication/Register";
import UseTerms from "@/app/Authentication/UseTerms";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TreatmentsProf from "@/app/Professional/TreatmentsProf";
import TreatmentsAdmin from "@/app/Admin/TreatmentsAdmin";
import HomeProf from "@/app/Professional/HomeProf";
import ConsultationsPageProf from "@/app/Professional/ConsultationsPageProf";
import SelectClientAdmin from "@/app/Admin/SelectClientAdmin";
import SelectProfessionalAdmin from "@/app/Admin/SelectProfessionalAdmin";
import BindProfessionalAdmin from "@/app/Admin/BindProfessionalAdmin";
import SelectDateHourAdmin from "@/app/Admin/SelectDateHourAdmin";
import RegisterNewUserAdmin from "@/app/Admin/RegisterNewUserAdmin";
import PatientsPageAdmin from "@/app/Admin/PatientsPageAdmin"
import RegisterNewTreatment from "@/app/Admin/RegisterNewTreatment";
import { useAuth } from "@/contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";
import { colors } from "@/theme/colors";
import RegisterAnotherUser from "@/app/Admin/RegisterAnotherUser";
import TreatmentPageAdmin from "@/app/Admin/TreatmentPageAdmin";
import ViewPatientsProfile from "@/app/Admin/ViewPatientsProfile";
import ProfessionalsPageAdmin from "@/app/Admin/ProfessionalsPageAdmin";
import ViewProfessionalsProfile from "@/app/Admin/ViewProfessionalsProfile";
import SelectDatePatient from "@/app/Patients/SelectDatePatient";
import ConsultationPageProf from "@/app/Professional/ConsultationPageProf";
import TreatmentPageProf from "@/app/Professional/TreatmentPageProf";
import SelectTreatmentProf from "@/app/Professional/SelectTreatmentProf";
import SelectDateHourProf from "@/app/Professional/SelectDateHourProf";
import SelectPatientProf from "@/app/Professional/SelectPatientProf";
import SelectTreatmentAdmin from "@/app/Admin/SelectTreatmentAdmin";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  const { token, isLoading, profile } = useAuth();

  if (isLoading || (token && profile === null)) {
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
      ) : profile?.user?.User.role === "CLIENT" ? (
        <>
          <Stack.Screen name="HomeClient" component={HomeClient} />
          <Stack.Screen name="SelectDatePatient" component={SelectDatePatient} />
          <Stack.Screen name="ConsultationPage" component={ConsultationPage} />
        </>
      ) : profile?.user?.User.role === "ADMIN" ? (
        <>
          <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
          <Stack.Screen name="RegisterAnotherUser" component={RegisterAnotherUser} />
          <Stack.Screen name="ConsultationsPageAdmin" component={ConsultationsPageAdmin} />
          <Stack.Screen name="ConsultationPageAdmin" component={ConsultationPageAdmin} />
          <Stack.Screen name="SelectClientAdmin" component={SelectClientAdmin} />
          <Stack.Screen name="SelectProfessionalAdmin" component={SelectProfessionalAdmin} />
          <Stack.Screen name="SelectTreatmentAdmin" component={SelectTreatmentAdmin} />
          <Stack.Screen name="BindProfessionalAdmin" component={BindProfessionalAdmin} />
          <Stack.Screen name="SelectDateHourAdmin" component={SelectDateHourAdmin} />
          <Stack.Screen name="RegisterNewUserAdmin" component={RegisterNewUserAdmin} />
          <Stack.Screen name="RegisterNewTreatment" component={RegisterNewTreatment} />
          <Stack.Screen name="PatientsPageAdmin" component={PatientsPageAdmin} />
          <Stack.Screen name="ProfessionalsPageAdmin" component={ProfessionalsPageAdmin} />
          <Stack.Screen name="TreatmentsAdmin" component={TreatmentsAdmin} />
          <Stack.Screen name="TreatmentPageAdmin" component={TreatmentPageAdmin} />
          <Stack.Screen name="ViewPatientsProfile" component={ViewPatientsProfile} />
          <Stack.Screen name="ViewProfessionalsProfile" component={ViewProfessionalsProfile} />
        </>
      ) : profile?.user?.User.role === "PROFESSIONAL" ? (
        <>
          <Stack.Screen name="HomeProf" component={HomeProf} />
          <Stack.Screen name="ConsultationsPageProf" component={ConsultationsPageProf} />
          <Stack.Screen name="ConsultationPageProf" component={ConsultationPageProf} />
          <Stack.Screen name="TreatmentPageProf" component={TreatmentPageProf} />
          <Stack.Screen name="TreatmentsProf" component={TreatmentsProf} />
          <Stack.Screen name="SelectTreatmentProf" component={SelectTreatmentProf} />
          <Stack.Screen name="SelectDateHourProf" component={SelectDateHourProf} />
          <Stack.Screen name="SelectPatientProf" component={SelectPatientProf} />
        </>
      ) : null}
    </Stack.Navigator>
  );
}
