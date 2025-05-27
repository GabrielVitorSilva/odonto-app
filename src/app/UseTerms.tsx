import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function UseTermsScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white pt-10">
      <Text className="text-4xl font-bold text-center mb-8">Termos de Uso</Text>

      <ScrollView className="px-4">
        <View className="space-y-4">
          <Text className="text-lg font-semibold">1. Aceitação dos Termos</Text>
          <Text className="text-base text-gray-700">
            Ao utilizar nosso aplicativo de agendamento odontológico, você concorda com estes termos de uso e com todas as políticas da clínica.
          </Text>

          <Text className="text-lg font-semibold">2. Agendamentos</Text>
          <Text className="text-base text-gray-700">
            2.1. Os horários disponíveis são atualizados em tempo real e podem ser alterados conforme a agenda da clínica.{'\n\n'}
            2.2. É necessário fornecer informações precisas e completas ao realizar o agendamento.{'\n\n'}
            2.3. A clínica reserva-se o direito de confirmar a disponibilidade do horário escolhido.
          </Text>

          <Text className="text-lg font-semibold">3. Cancelamentos e Remarcações</Text>
          <Text className="text-base text-gray-700">
            3.1. Cancelamentos devem ser realizados com pelo menos 24 horas de antecedência.{'\n\n'}
            3.2. Remarcações podem ser feitas através do aplicativo ou contato direto com a clínica.{'\n\n'}
            3.3. Faltas consecutivas podem resultar em restrições para novos agendamentos.
          </Text>

          <Text className="text-lg font-semibold">4. Privacidade e Dados Médicos</Text>
          <Text className="text-base text-gray-700">
            4.1. Seus dados pessoais e informações de saúde são protegidos conforme a LGPD.{'\n\n'}
            4.2. O histórico odontológico será mantido em sigilo e utilizado apenas para fins de tratamento.{'\n\n'}
            4.3. Você pode solicitar acesso e correção de seus dados a qualquer momento.
          </Text>

          <Text className="text-lg font-semibold">5. Responsabilidades</Text>
          <Text className="text-base text-gray-700">
            5.1. É responsabilidade do usuário manter seus dados de acesso seguros.{'\n\n'}
            5.2. A clínica não se responsabiliza por problemas técnicos que impossibilitem o agendamento.{'\n\n'}
            5.3. Em caso de emergência, entre em contato diretamente com a clínica.
          </Text>

          <Text className="text-lg font-semibold">6. Modificações</Text>
          <Text className="text-base text-gray-700">
            A clínica reserva-se o direito de modificar estes termos a qualquer momento. Alterações significativas serão comunicadas através do aplicativo ou por e-mail.
          </Text>

          <Text className="text-lg font-semibold">7. Contato</Text>
          <Text className="text-base text-gray-700">
            Para dúvidas sobre estes termos ou sobre o funcionamento do aplicativo, entre em contato com nossa equipe de atendimento.
          </Text>
        </View>
      </ScrollView>

      <View className="p-4">
        <TouchableOpacity 
          className="bg-sky-500 py-4 rounded-full"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white text-center font-semibold">Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
