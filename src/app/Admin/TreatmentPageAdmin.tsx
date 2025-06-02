import Header from '@/components/Header';
import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Button } from '@/components/Button';
import { useNavigation } from '@react-navigation/native';

type RouteParams = {
    name: string;
    description: string;
}

export default function TreatmentPageAdmin() {
  const navigation = useNavigation()
  
  const bindedEmployees = [
    {name: "Maria Santos"},
    {name: "Flávia Souza"}
  ]
  
  return (
    <View className='flex-1'>  
      <Header className='bg-app-blue' contentColor='white' />
      <View className="flex-1 px-4 py-4">
        <Text className="text-3xl font-semibold mb-4">Clareamento</Text>
        <Text>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </Text>

        <Text className='mt-10 text-2xl font-semibold'>Funcionários Vinculados</Text>
        <FlatList
              data={bindedEmployees}
              renderItem={({ item, index }) => (
                <View
                  className={`py-5 px-8 rounded-xl`}
                >
                  <Text className="text-xl">{item.name}</Text>
                </View>
              )}
        />

        <Button title='Vincular Odontologo' onPress={() => {navigation.navigate("BindProfessionalAdmin")}} className='mb-14' />
      </View>
    </View>
  );
};
