import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/Button';
import { useToast } from '@/contexts/ToastContext';
import api from '@/services/api';

interface FieldErrors {
  name: boolean;
  email: boolean;
  cpf: boolean;
  password: boolean;
  terms: boolean;
}

export default function Register() {
  const navigation = useNavigation();
  const { showToast } = useToast();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({
    name: false,
    email: false,
    cpf: false,
    password: false,
    terms: false,
  });
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateCPF(cpf: string) {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf);
  }

  function formatCPF(value: string) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  }

  function validateFields() {
    const newErrors = {
      name: !name.trim(),
      email: !email.trim() || !validateEmail(email),
      cpf: !cpf.trim() || !validateCPF(cpf),
      password: !password.trim() || password.length < 6,
      terms: !termsAccepted,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  }

  async function handleRegister() {
    setHasAttemptedSubmit(true);
    if (!validateFields()) return;

    try {
      const response = await api.post('/register/client', {
        name: name.trim(),
        email: email.trim(),
        password,
        cpf,
      });
      showToast('Cadastro realizado com sucesso!', 'success');
      navigation.navigate('Login');
    } catch (error: any) {
      if (error.response?.data?.message) {
        showToast(error.response.data.message, 'error');
      } else if (error.response?.status === 409) {
        showToast('Este email ou CPF já está cadastrado', 'error');
      } else {
        showToast('Erro ao realizar cadastro. Tente novamente mais tarde.', 'error');
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 bg-white pt-10"
      >
        <Text className="text-4xl font-roboto-bold text-center mb-32">Cadastrar</Text>

        <View className="space-y-4 mx-4">
          <TextInput
            placeholder="Nome completo"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (hasAttemptedSubmit) {
                setErrors(prev => ({ ...prev, name: !text.trim() }));
              }
            }}
            className={`bg-gray-100 p-4 rounded-2xl text-base mb-4 font-roboto ${
              errors.name && hasAttemptedSubmit ? 'border-2 border-red-500' : ''
            }`}
            placeholderTextColor="#999"
            autoCapitalize="words"
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (hasAttemptedSubmit) {
                setErrors(prev => ({ ...prev, email: !text.trim() || !validateEmail(text) }));
              }
            }}
            className={`bg-gray-100 p-4 rounded-2xl text-base mb-4 font-roboto ${
              errors.email && hasAttemptedSubmit ? 'border-2 border-red-500' : ''
            }`}
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          /> 
          
          <TextInput
            placeholder="CPF (000.000.000-00)"
            value={cpf}
            onChangeText={(text) => {
              const formattedCpf = formatCPF(text);
              setCpf(formattedCpf);
              if (hasAttemptedSubmit) {
                setErrors(prev => ({ ...prev, cpf: !formattedCpf.trim() || !validateCPF(formattedCpf) }));
              }
            }}
            className={`bg-gray-100 p-4 rounded-2xl text-base mb-4 font-roboto ${
              errors.cpf && hasAttemptedSubmit ? 'border-2 border-red-500' : ''
            }`}
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={14}
          />

          <View className="relative">
            <TextInput
              placeholder="Senha (mínimo 6 caracteres)"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (hasAttemptedSubmit) {
                  setErrors(prev => ({ ...prev, password: !text.trim() || text.length < 6 }));
                }
              }}
              secureTextEntry={!passwordVisible}
              className={`bg-gray-100 p-4 rounded-2xl text-base mb-4 font-roboto ${
                errors.password && hasAttemptedSubmit ? 'border-2 border-red-500' : ''
              }`}
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-4 top-4"
            >
              <Text className="text-app-blue font-roboto-medium">
                {passwordVisible ? 'Ocultar' : 'Visualizar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          className="mt-4 p-4" 
          onPress={() => {
            setTermsAccepted(!termsAccepted);
            if (hasAttemptedSubmit) {
              setErrors(prev => ({ ...prev, terms: !termsAccepted }));
            }
            navigation.navigate('UseTerms');
          }}
        >
          <Text className={`text-center font-roboto-medium underline ${
            termsAccepted ? 'text-green-500' : errors.terms && hasAttemptedSubmit ? 'text-red-500' : 'text-gray-400'
          }`}>
            {termsAccepted ? '✓ Termos e condições aceitos' : 'Confirmo que li e aceito os termos e condições'}
          </Text>
        </TouchableOpacity>

        <Button 
          title="Cadastrar" 
          onPress={handleRegister}
          disabled={hasAttemptedSubmit && Object.values(errors).some(error => error)}
          className={hasAttemptedSubmit && Object.values(errors).some(error => error) ? 'opacity-50' : ''}
        />

        <TouchableOpacity className="p-2" 
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-app-blue text-center text-xl font-roboto-medium">
            Já possui uma conta? Faça login
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
