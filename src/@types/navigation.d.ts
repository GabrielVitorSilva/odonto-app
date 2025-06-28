export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UseTerms: undefined;
  HomeClient: undefined;
  TreatmentsPatient: undefined;
  TreatmentPagePatient: {
    name: string;
    description: string;
    duration: number;
    price: number;
  };
  ConsultationPage: {
    id: string;
    name: string;
    date: string;
    hour: string;
    professionalName: string;
    status: string;
  };
  ConsultationPageAdmin: {
    id: string;
    name: string;
    dateTime: Date;
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
    clientId: string;
  };
  ProfessionalsPageAdmin: undefined;
  ViewProfessionalsProfile: {
    name: string;
    professionalId: string;
  }
  ConsultationsPageAdmin: undefined;
  Treatments: undefined;
  TreatmentsAdmin: undefined;
  TreatmentPageAdmin: {
    name: string;
    description: string;
    duration: number;
    price: number;
    treatment_id: string;
    professionals: string[];
  };
  HomeProf: undefined;
  ConsultationsPageProf: undefined;
  SelectClientAdmin: undefined;
  SelectProfessionalAdmin: undefined;
  SelectDateHourAdmin: undefined;
  SelectTreatmentAdmin: undefined;
  TreatmentsProf: undefined;
  SelectDateHourProf: undefined;
  SelectPatientProf: undefined;
  SelectTreatmentProf: undefined;
  ConsultationPageProf: {
    id: string;
    name: string;
    dateTime: Date;
    status: string;
    patientName: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
