export type RootStackParamList = {
  Teste1: undefined;
  Teste2: undefined;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}