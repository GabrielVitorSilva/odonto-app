import { View, Text, Modal, Pressable } from "react-native";
import { Button } from "./Button";
import { ReactNode } from "react";

type BottomDrawerProps = {
  title: string;
  content: ReactNode;
  buttonTitle: string;
  handlePress: () => void;
  showDrawer: boolean;
  setShowDrawer: (visible: boolean) => void;
};

export default function BottomDrawer({
  title,
  content,
  buttonTitle,
  handlePress,
  showDrawer,
  setShowDrawer,
}: BottomDrawerProps) {
  return (
    <Modal visible={showDrawer} animationType="slide" transparent>
      <Pressable
        className="flex-1 justify-end bg-black/50"
        onPress={() => setShowDrawer(false)}
      >
        <Pressable className="bg-white p-6 rounded-t-3xl" onPress={() => {}}>
          <Text className="text-xl font-semibold text-center mb-2">
            {title}
          </Text>
          <Text className="text-center mb-6">{content}</Text>

          <Button className="mt-4" title={buttonTitle} onPress={handlePress} />
          <Button
            className="mt-4 bg-white border border-app-blue"
            title="Fechar"
            titleColor="app-blue"
            onPress={() => setShowDrawer(false)}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}
