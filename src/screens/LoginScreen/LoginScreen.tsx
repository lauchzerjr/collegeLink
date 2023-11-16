import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CText } from "../../components/CText/CText";
import { CButton } from "../../components/CButton/CButton";
import { CScreen } from "../../components/CScreen/CScreen";
import { CBox } from "../../components/CBox/CBox";
import { useAuth } from "../../hooks/useAuth";
import { LoginSchema, loginSchema } from "./loginSchema";
import { CFormTextInput } from "../../components/CForm/CFormTextInput";
import { CFormPasswordInput } from "../../components/CForm/CFormPasswordInput";
import { SignupSchema, signupSchema } from "./signupSchema";
import { CModal } from "../../components/CModal/CModal";
import { useUser } from "../../hooks/useUser";
import {
  ForgotPasswordSchema,
  forgotPasswordSchema,
} from "./forgotPasswordSchema";

export function LoginScreen() {
  const [createAccount, setCreateAccount] = React.useState(false);
  const [modalForgotPassword, setModalForgotPassword] = React.useState(false);

  const {
    isLoading,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } = useAuth();

  const { forgotPassword } = useUser();

  const { control, formState, handleSubmit, getValues } = useForm<
    LoginSchema | SignupSchema | ForgotPasswordSchema
  >({
    resolver: zodResolver(
      createAccount
        ? signupSchema
        : modalForgotPassword
        ? forgotPasswordSchema
        : loginSchema
    ),
    defaultValues: {
      name: "",
      email: "lauchzerjr@gmail.com",
      password: "12345678",
    },
    mode: "onChange",
  });

  const handleForgotPassword = async () => {
    await forgotPassword(getValues("email"));
    toggleModal();
  };

  function toggleModal() {
    setModalForgotPassword((prev) => !prev);
  }

  const signIn = async () => {
    await signInWithEmailAndPassword(getValues("email"), getValues("password"));
  };

  const signUp = async () => {
    await createUserWithEmailAndPassword(
      getValues("name"),
      getValues("email"),
      getValues("password")
    );
  };

  const submit = createAccount ? handleSubmit(signUp) : handleSubmit(signIn);

  return (
    <CScreen isScroll>
      <CBox alignItems="center">
        <FontAwesome5 name="graduation-cap" size={150} color="#005999" />
      </CBox>

      <CText
        color="bluePrimary"
        fontWeight="bold"
        fontSize={22}
        textAlign="center"
        mb="s8"
      >
        Seja bem-vindo ao CollegeLink
      </CText>
      <CText color="bluePrimary" fontSize={16} textAlign="center" mb="s24">
        Explore cursos, postagens de alunos de outras faculdades e conecte-se ao
        aprendizado de forma direta e interativa.
      </CText>

      <CText
        color="bluePrimary"
        fontWeight="bold"
        fontSize={16}
        mb="s16"
        textAlign="center"
      >
        {createAccount ? "Crie sua conta aqui" : "Entrar no app"}
      </CText>

      {createAccount && (
        <CFormTextInput
          control={control}
          name="name"
          iconRight={<FontAwesome5 name="user-alt" size={20} color="#005999" />}
          label="Nome"
          placeholder="Digite seu nome"
          boxProps={{ mb: "s10" }}
        />
      )}

      <CFormTextInput
        control={control}
        name="email"
        iconRight={<Feather name="at-sign" size={20} color="#005999" />}
        label="E-mail acadêmico"
        placeholder="Digite seu e-mail acadêmico"
        boxProps={{ mb: "s10" }}
      />

      <CFormPasswordInput
        control={control}
        name="password"
        label="Senha"
        placeholder="Digite sua senha"
        boxProps={{ mb: "s10" }}
        onSubmitEditing={submit}
      />

      {!createAccount && (
        <CBox alignItems="center">
          <CText
            fontWeight="bold"
            fontSize={16}
            color="primary"
            onPress={toggleModal}
          >
            Esqueci minha senha
          </CText>
        </CBox>
      )}

      <CModal
        disabledButton={!formState.isValid}
        isForgotPassword
        titleButton="Recuperar senha"
        visible={modalForgotPassword}
        onClose={toggleModal}
        control={control}
        title="Esqueci minha senha"
        description="Digite seu e-mail e enviaremos as instruções para redefinição de
        senha"
        onPress={handleForgotPassword}
      />

      <CButton
        loading={isLoading}
        disabled={!formState.isValid}
        mt={createAccount ? "s12" : "s20"}
        title={createAccount ? "Cadastrar" : "Entrar"}
        onPress={submit}
      />

      <CButton
        mt="s12"
        preset="outline"
        title={createAccount ? "Já tenho uma conta" : "Criar uma conta"}
        onPress={() => setCreateAccount(!createAccount)}
      />
    </CScreen>
  );
}
