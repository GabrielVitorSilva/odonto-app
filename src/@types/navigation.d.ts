export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UseTerms: undefined;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}