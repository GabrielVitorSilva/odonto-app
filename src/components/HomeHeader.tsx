import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { Text, TouchableOpacity, View, StatusBar, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useEffect, useState } from 'react';
import { useToast } from "@/contexts/ToastContext";

type HomeHeaderProps = {
  title: string;
  className?: string;
};

export default function HomeHeader({
  title,
  className,
}: HomeHeaderProps) {
  const { signOut } = useAuth();
  const { showToast } = useToast()
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showRemoveButton, setShowRemoveButton] = useState(false);

  useEffect(() => {
    (async () => {
      const savedImage = await AsyncStorage.getItem('@OdontoApp:profileImage');
      if (savedImage) setProfileImage(savedImage);
    })();
  }, []);

  async function handlePickImage() {
    console.log('Botão de imagem clicado');
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log('Status da permissão:', status);
    if (status !== 'granted') {
      showToast('Permissão para acessar a galeria é necessária!', 'error');
      return;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setProfileImage(uri);
        setShowRemoveButton(false);
        await AsyncStorage.setItem('@OdontoApp:profileImage', uri);
        showToast('Foto selecionada com sucesso!', 'success');
      }
    } catch (e: any) {
      showToast('Erro ao abrir galeria: ' + e.message, 'error');
      console.log('Erro ao abrir galeria:', e);
    }
  }

  async function handleRemoveImage() {
    try {
      await AsyncStorage.removeItem('@OdontoApp:profileImage');
      setProfileImage(null);
      setShowRemoveButton(false);
      showToast('Foto removida com sucesso!', 'success');
    } catch (error) {
      showToast('Erro ao remover foto', 'error');
      console.log('Erro ao remover foto:', error);
    }
  }

  function handleImagePress() {
    if (profileImage) {
      setShowRemoveButton(!showRemoveButton);
    } else {
      handlePickImage();
    }
  }
  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        translucent
        backgroundColor="transparent"
      />
      <View style={{marginBottom: 65}} className={`bg-app-blue w-full pt-16 pb-[100px] px-5 ${className || ""}`}>
        <View className="flex-row w-full items-center justify-between">
          <View className="flex-1 w-13"></View>
          <Text className={`text-3xl font-semibold text-white`}>{title}</Text>
          <TouchableOpacity className="w-13 flex-1 items-end" onPress={() => signOut()}>
            <Text className={`text-xl text-white `}>Sair</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-full  absolute bottom-[-4rem] self-center">
          <TouchableOpacity onPress={handleImagePress} activeOpacity={0.7}>
            {profileImage ? (
              <View style={{ position: 'relative' }}>
                <Image
                  source={{ uri: profileImage }}
                  style={{ width: 115, height: 115, borderRadius: 999, resizeMode: 'cover', transform: [{ scale: 1.3 }], marginBottom: 15 }}
                />
                {showRemoveButton && (
                  <TouchableOpacity 
                    onPress={handleRemoveImage}
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      backgroundColor: 'red',
                      borderRadius: 12,
                      width: 24,
                      height: 24,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons name="close" size={16} color="white" />
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <Ionicons name="person-circle-outline" style={{transform: 'scale(1.3)'}} size={135} color="#38ABE2" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

