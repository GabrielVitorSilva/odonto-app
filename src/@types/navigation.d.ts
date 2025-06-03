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
    professionals: String[];
  };
  ConsultationsPageAdmin: undefined;
  Treatments: undefined;
  TreatmentsAdmin: undefined;
  TreatmentPageAdmin: {
    name: string;
    description: string;
  };
  HomeProf: undefined;
  ConsultationsPageProf: undefined;
  SelectClientAdmin: undefined;
  SelectProfessionalAdmin: undefined;
  SelectDateHourAdmin: undefined;
  BindProfessionalAdmin: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
