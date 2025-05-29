export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UseTerms: undefined;
  HomeClient: undefined;
  ConsultationPage: undefined;
  HomeAdmin: undefined;
  ConsultationsPageAdmin: undefined;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}