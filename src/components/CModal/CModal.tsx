import React from "react";
import { Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Control } from "react-hook-form";

import { CText } from "../CText/CText";
import { CFormTextInput } from "../CForm/CFormTextInput";
import { CButton } from "../CButton/CButton";
import { CBox, CTouchableOpacityBox } from "../CBox/CBox";
import { CFormPasswordInput } from "../CForm/CFormPasswordInput";
import { useUser } from "../../hooks/useUser";

interface CModalProps {
  title: string;
  titleButton: string;
  description: string;
  visible: boolean;
  control: Control;
  isForgotPassword?: boolean;
  disabledButton: boolean;
  onClose: () => void;
  onPress: () => void;
}

export const CModal = ({
  title,
  titleButton,
  description,
  visible,
  control,
  isForgotPassword,
  disabledButton,
  onClose,
  onPress,
}: CModalProps) => {
  const { isLoading } = useUser();

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

            {isForgotPassword && (
              <CText
                fontSize={16}
                textAlign="center"
                color="bluePrimary"
                mt="s10"
              >
                {description}
              </CText>
            )}

            {isForgotPassword ? (
              <CFormTextInput
                control={control}
                name="email"
                iconRight={<Feather name="at-sign" size={20} color="#005999" />}
                label="E-mail acadêmico"
                placeholder="Digite seu e-mail acadêmico"
                boxProps={{ mt: "s16", mb: "s16" }}
              />
            ) : (
              <>
                <CFormPasswordInput
                  control={control}
                  name="oldPassword"
                  label="Senha atual"
                  placeholder="Digite sua senha atual"
                  boxProps={{ mb: "s10" }}
                />
                <CFormPasswordInput
                  control={control}
                  name="newPassword"
                  label="Nova senha"
                  placeholder="Digite sua nova senha"
                  boxProps={{ mb: "s10" }}
                />
              </>
            )}
            <CButton
              disabled={disabledButton}
              title={titleButton}
              onPress={onPress}
              loading={isLoading}
              mb="s10"
            />
          </CBox>
        </CBox>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
