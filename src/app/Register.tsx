import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

export default function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white  pt-10"
    >
      <Text className="text-4xl font-bold text-center mb-32">Cadastrar</Text>

      <View className="space-y-4 mx-4">
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="bg-gray-100 p-4 rounded-md text-base mb-4"
          placeholderTextColor="#999"
        />

        <View className="relative">
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            className="bg-gray-100 p-4 rounded-md text-base pr-20"
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-4 top-4"
          >
            <Text className="text-sky-500 font-medium">Visualizar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity className="bg-sky-500 py-4 rounded-full mt-32">
        <Text className="text-white text-center font-semibold">Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4">
        <Text className="text-sky-500 text-center font-medium">Esqueceu a senha?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
