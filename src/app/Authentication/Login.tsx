import { useNavigation } from '@react-navigation/native';
import React, { use, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Button } from '@/components/Button';
import { useToast } from '@/contexts/ToastContext';
import { loginSchema, type LoginFormData } from '@/schemas/loginSchema';
import { authService, Profile } from '@/services/auth';
import { useAuth } from '@/contexts/AuthContext';

interface FieldErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { showToast } = useToast();
  const { signIn, setProfile } = useAuth();

  function validateField(field: keyof LoginFormData, value: any) {
    if (!hasAttemptedSubmit) return;

    const formData = {
      email,
      password,
      [field]: value
    };

    try {
      loginSchema.parse(formData);
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
        email,
        password
      };

      loginSchema.parse(formData);
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

  async function handleLogin() {
    setHasAttemptedSubmit(true);
    if (!validateFields()) return;

    try {
      setIsLoading(true);
      const { token } = await authService.login({ email, password });
      const { user } = await authService.profile(token);
      await signIn(token);
      
      setProfile({ user });
      if (user.role === Profile.CLIENT) {
        navigation.navigate('HomeClient');
      }

      if (user.role ===   Profile.PROFESSIONAL) {
        navigation.navigate('HomeProf');
      }

      if (user.role ===   Profile.ADMIN) {
        navigation.navigate('HomeAdmin');
      }
      showToast('Login realizado com sucesso!', 'success');
      // TODO: Implementar navegação após login
    } catch (error: any) {
      if (error.response?.data?.message) {
        showToast(error.response.data.message, 'error');
      } else {
        showToast('Erro ao realizar login. Tente novamente mais tarde.', 'error');
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
            <Text className="text-4xl font-roboto-bold text-center mb-32">Entrar</Text>

            <View className="space-y-4 mx-4">
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
                <View className="relative">
                  <TextInput
                    placeholder="Senha"
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
                title="Entrar" 
                onPress={handleLogin}
                isLoading={isLoading}
                disabled={Object.keys(errors).length > 0}
                className={Object.keys(errors).length > 0 ? 'opacity-50' : ''}
              />

              <TouchableOpacity className="p-2 mt-4">
                <Text className="text-app-blue text-center font-roboto-medium">
                  Esqueceu a senha?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                className="p-2 mt-4"
                onPress={() => navigation.navigate('Register')}
              >
                <Text className="text-app-blue text-center text-xl font-roboto-medium">
                  Não possui uma conta? Cadastre-se
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
