import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
  onHide: () => void;
}

export function Toast({ message, type, visible, onHide }: ToastProps) {
  const translateX = new Animated.Value(100);

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(translateX, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide();
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateX }],
        },
      ]}
      className={`absolute top-10 right-4 z-50 rounded-full shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      <View className="px-6 py-4 min-w-[200px]">
        <Text className="text-white text-base text-center font-roboto-medium">
          {message}
        </Text>
      </View>
    </Animated.View>
  );
} 