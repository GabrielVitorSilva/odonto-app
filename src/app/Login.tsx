import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button } from '@/components/Button';

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 bg-white  pt-10"
      >
        <Text className="text-4xl font-bold text-center mb-32">Entrar</Text>

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
              onPress={() =>
                setPasswordVisible(!passwordVisible)
              }
              className="absolute right-4 top-4"
            >
              <Text className="text-app-blue font-medium">Visualizar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button title="Entrar" onPress={() => navigation.navigate('Register')} />

        <TouchableOpacity className="mt-4">
          <Text className="text-app-blue text-center font-medium">Esqueceu a senha?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
