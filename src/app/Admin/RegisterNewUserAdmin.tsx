// src/app/Admin/RegisterNewUserAdmin.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import Header from '../../components/Header'; 

const placeholderPaciente = require('../../assets/placeholder_paciente.png');
const placeholderProfissional = require('../../assets/placeholder_profissional.png');
const placeholderAdmin = require('../../assets/placeholder_administrador.png');

export default function RegisterNewUserAdmin() {

  const handleUserTypePress = (userType: string) => {
    console.log("Tipo de usuário selecionado:", userType);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
     
      <Header 
        hasExit={false}
        contentColor="black"
        className="pb-15 pt-20" 
      />

    
      <View className="px-5 mb-8"> 
     
        <Text className="text-5xl font-semibold text-black">
          Cadastrar Usuário
        </Text>
      </View>
      
    
      <View className="px-5 pb-6 flex-1"> 
        <View className="space-y-6">
          <TouchableOpacity 
            className="flex-row items-center p-3 bg-gray-50 rounded-lg shadow"
            onPress={() => handleUserTypePress('Paciente')}
          >
            <Image 
              source={placeholderPaciente}
              className="w-20 h-20 rounded-md mr-4" 
              resizeMode="cover"
            />
            <Text className="text-xl text-gray-800 font-medium">Paciente</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center p-3 bg-gray-50 rounded-lg shadow"
            onPress={() => handleUserTypePress('Profissional')}
          >
            <Image 
              source={placeholderProfissional}
              className="w-20 h-20 rounded-md mr-4" 
              resizeMode="cover"
            />
            <Text className="text-xl text-gray-800 font-medium">Profissional</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center p-3 bg-gray-50 rounded-lg shadow"
            onPress={() => handleUserTypePress('Administrador')}
          >
            <Image 
              source={placeholderAdmin}
              className="w-20 h-20 rounded-md mr-4" 
              resizeMode="cover"
            />
            <Text className="text-xl text-gray-800 font-medium">Administrador</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}