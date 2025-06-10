import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/Button';
import { useToast } from '@/contexts/ToastContext';
import { registerAnotherUserSchema, type RegisterAnotherUserFormData } from '@/schemas/registerAnotherUserSchema';
import { authService, Profile } from '@/services/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

interface FieldErrors {
  name?: string;
  email?: string;
  cpf?: string;
  password?: string;
  phone?: string;
  role?: string;
}

export default function RegisterAnotherUser() {
  const navigation = useNavigation();
  const { showToast } = useToast();
  const { signIn, setProfile } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [cpfClean, setCpfClean] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<Profile>(Profile.CLIENT);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function formatCPF(value: string) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  }

  function formatPhone(value: string) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }

  function validateField(field: keyof RegisterAnotherUserFormData, value: any) {
    if (!hasAttemptedSubmit) return;

    const formData = {
      name,
      email,
      cpf,
      password,
      phone,
      role,
      [field]: value
    };

    try {
      registerAnotherUserSchema.parse(formData);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } catch (error: any) {
      if (error.errors) {
        const fieldError = error.errors.find((err: any) => err.path[0] === field);
        if (fieldError) {
          setErrors(prev => ({
            ...prev,
            [field]: fieldError.message
          }));
        } else {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
      }
    }
  }

  function validateFields() {
    try {
      const formData = {
        name,
        email,
        cpf,
        password,
        phone,
        role
      };

      registerAnotherUserSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      if (error.errors) {
        const newErrors: FieldErrors = {};
        error.errors.forEach((err: any) => {
          newErrors[err.path[0] as keyof FieldErrors] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  }

  console.log(errors)

  async function handleRegister() {
    setHasAttemptedSubmit(true);
    if (!validateFields()) return;
    try {
      setIsLoading(true);
      await authService.registerAnotherUser({
        name,
        email,
        password,
        cpf: cpfClean,
        phone,
        role
      });
      
      showToast('Novo usuário cadastrado com sucesso!', 'success');
      navigation.navigate('HomeAdmin');
    } catch (error: any) {
      if (error.response?.data?.message) {
        showToast(error.response.data.message, 'error');
      } else if (error.response?.status === 409) {
        showToast('Este email ou CPF já está cadastrado', 'error');
      } else {
        showToast('Erro ao realizar cadastro. Tente novamente mais tarde.', 'error');
      }
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView 
        className="flex-1"
        contentContainerClassName="flex-grow"
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 pt-10">
            <TouchableOpacity 
              className="absolute left-4 top-10 z-10"
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            <Text className="text-4xl font-roboto-bold text-center mb-32">Cadastrar</Text>

            <View className="space-y-4 mx-4">
              <View>
                <TextInput
                  placeholder="Nome completo"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    validateField('name', text);
                  }}
                  className={`bg-gray-100 p-4 rounded-2xl text-base mb-1 font-roboto ${
                    errors.name ? 'border-2 border-red-500' : ''
                  }`}
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                />
                {errors.name && (
                  <Text className="text-red-500 text-sm ml-2">{errors.name}</Text>
                )}
              </View>

              <View>
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    validateField('email', text);
                  }}
                  className={`bg-gray-100 p-4 rounded-2xl text-base mb-1 font-roboto ${
                    errors.email ? 'border-2 border-red-500' : ''
                  }`}
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && (
                  <Text className="text-red-500 text-sm ml-2">{errors.email}</Text>
                )}
              </View>
              
              <View>
                <TextInput
                  placeholder="CPF (000.000.000-00)"
                  value={cpf}
                  onChangeText={(text) => {
                    setCpfClean(text.replace(/\D/g, ''));
                    const formattedCpf = formatCPF(text);
                    setCpf(formattedCpf);
                    validateField('cpf', formattedCpf);
                  }}
                  className={`bg-gray-100 p-4 rounded-2xl text-base mb-1 font-roboto ${
                    errors.cpf ? 'border-2 border-red-500' : ''
                  }`}
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={14}
                />
                {errors.cpf && (
                  <Text className="text-red-500 text-sm ml-2">{errors.cpf}</Text>
                )}
              </View>

              <View>
                <TextInput
                  placeholder="Telefone ((00) 00000-0000)"
                  value={phone}
                  onChangeText={(text) => {
                    const formattedPhone = formatPhone(text);
                    setPhone(formattedPhone);
                    validateField('phone', formattedPhone);
                  }}
                  className={`bg-gray-100 p-4 rounded-2xl text-base mb-1 font-roboto ${
                    errors.phone ? 'border-2 border-red-500' : ''
                  }`}
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={15}
                />
                {errors.phone && (
                  <Text className="text-red-500 text-sm ml-2">{errors.phone}</Text>
                )}
              </View>

              <View>
                <View className={`bg-gray-100 rounded-2xl mb-1 ${
                  errors.role ? 'border-2 border-red-500' : ''
                }`}>
                  <Picker
                    selectedValue={role}
                    onValueChange={(value) => {
                      setRole(value);
                      validateField('role', value);
                    }}
                    style={{ height: 50 }}
                  >
                    <Picker.Item label="Cliente" value={Profile.CLIENT} />
                    <Picker.Item label="Profissional" value={Profile.PROFESSIONAL} />
                    <Picker.Item label="Administrador" value={Profile.ADMIN} />
                  </Picker>
                </View>
                {errors.role && (
                  <Text className="text-red-500 text-sm ml-2">{errors.role}</Text>
                )}
              </View>

              <View>
                <View className="relative">
                  <TextInput
                    placeholder="Senha (mín 6 e 1 maiúsculo)"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      validateField('password', text);
                    }}
                    secureTextEntry={!passwordVisible}
                    className={`bg-gray-100 p-4 rounded-2xl text-base mb-1 font-roboto ${
                      errors.password ? 'border-2 border-red-500' : ''
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
                {errors.password && (
                  <Text className="text-red-500 text-sm ml-2">{errors.password}</Text>
                )}
              </View>
            </View>

            <View className="mt-4 mb-8">
              <Button 
                title="Cadastrar" 
                onPress={handleRegister}
                disabled={Object.keys(errors).length > 0}
                className={Object.keys(errors).length > 0 ? 'opacity-50' : ''}
                isLoading={isLoading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
