import React from "react";
import { Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { CText } from "../CText/CText";
import { CBox, CTouchableOpacityBox } from "../CBox/CBox";

interface CModalProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const CModal = ({ visible, title, children, onClose }: CModalProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      style={{ backgroundColor: "red" }}
    >
      <CTouchableOpacityBox
        flex={1}
        backgroundColor="backgroundOpacity"
        activeOpacity={0.7}
        onPress={onClose}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <CBox bg="backgroundOpacity">
          <CBox
            p="s12"
            bg="background"
            borderTopRightRadius="s12"
            borderTopLeftRadius="s12"
          >
            <CText
              fontSize={18}
              textAlign="center"
              fontWeight="bold"
              color="bluePrimary"
            >
              {title}
            </CText>

            {children}
          </CBox>
        </CBox>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
