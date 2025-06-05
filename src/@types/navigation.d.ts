export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UseTerms: undefined;
  HomeClient: undefined;
  ConsultationPage: {
    name: string;
    date: string;
    hour: string;
    professionalName: string;
  };
  ConsultationPageAdmin: {
    name: string;
    date: string;
    hour: string;
    status: string;
    patientName: string;
    professionalName: string;
  };
  HomeAdmin: undefined;
  RegisterAnotherUser: undefined;
  RegisterNewTreatment: {
    professionals: string[];
  };
  PatientsPageAdmin: undefined;
  ViewPatientsProfile: {
    name: string;
  };
  ProfessionalsPageAdmin: undefined;
  ViewProfessionalsProfile: {
    name: string;
  }
  ConsultationsPageAdmin: undefined;
  Treatments: undefined;
  TreatmentsAdmin: undefined;
  TreatmentPageAdmin: {
    name: string;
    description: string;
    professionals: string[];
  };
  HomeProf: undefined;
  ConsultationsPageProf: undefined;
  SelectClientAdmin: undefined;
  SelectProfessionalAdmin: undefined;
  SelectDateHourAdmin: undefined;
  BindProfessionalAdmin: {
    alreadyBound: string[];
    returnTo: {
        screen: keyof RootStackParamList;
        params?: RootStackParamList[keyof RootStackParamList];
    }
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
