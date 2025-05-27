import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/Button';
export default function Register() {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 bg-white pt-10"
      >
        <Text className="text-4xl font-roboto-bold text-center mb-32">Cadastrar</Text>

        <View className="space-y-4 mx-4">
        <TextInput
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            className="bg-gray-100 p-4 rounded-md text-base mb-4 font-roboto"
            placeholderTextColor="#999"
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="bg-gray-100 p-4 rounded-md text-base mb-4 font-roboto"
            placeholderTextColor="#999"
          /> 
          
          <TextInput
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
            className="bg-gray-100 p-4 rounded-md text-base mb-4 font-roboto"
            placeholderTextColor="#999"
          />

          <View className="relative">
            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              className="bg-gray-100 p-4 rounded-md text-base pr-20 font-roboto"
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-4 top-4"
            >
              <Text className="text-app-blue font-roboto-medium">Visualizar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          className="mt-4 p-4" 
          onPress={() => navigation.navigate('UseTerms')}
        >
          <Text className="text-gray-400 text-center font-roboto-medium underline">
            Confirmo que li e aceito os termos e condições
          </Text>
        </TouchableOpacity>

        <Button title="Cadastrar" onPress={() => navigation.navigate('Login')} />

        <TouchableOpacity className="mt-2 p-4" 
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-app-blue text-center text-xl font-roboto-medium">Já possui uma conta? Faça login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
