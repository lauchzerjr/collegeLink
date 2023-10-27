import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CText } from "../../components/CText/CText";
import { CButton } from "../../components/CButton/CButton";
import { CScreen } from "../../components/CScreen/CScreen";
import { CBox, CTouchableOpacityBox } from "../../components/CBox/CBox";
import { useAuth } from "../../hooks/useAuth";
import { LoginSchema, loginSchema } from "./loginSchema";
import { CFormTextInput } from "../../components/CForm/CFormTextInput";
import { CFormPasswordInput } from "../../components/CForm/CFormPasswordInput";
import { SignupSchema, signupSchema } from "./signupSchema";

export function LoginScreen() {
  const [createAccount, setCreateAccount] = React.useState(false);

  const { control, formState, handleSubmit, getValues } = useForm<LoginSchema | SignupSchema>({
    resolver: zodResolver(createAccount ? signupSchema : loginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const {
    isLoading,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } = useAuth();

  const signIn = async () => {
    await signInWithEmailAndPassword(getValues("email"), getValues("password"));
    Keyboard.dismiss();
  };

  const signUp = async () => {
    await createUserWithEmailAndPassword(getValues("name"), getValues("email"), getValues("password"));
    Keyboard.dismiss();
  };

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
      />

      {!createAccount && (
        <CText
          textAlign="center"
          fontWeight="bold"
          fontSize={16}
          color="primary"
        >
          Esqueci minha senha
        </CText>
      )}

      <CButton
        loading={isLoading}
        disabled={!formState.isValid}
        mt={createAccount ? "s12" : "s20"}
        title={createAccount ? "Cadastrar" : "Entrar"}
        onPress={createAccount ? handleSubmit(signUp) : handleSubmit(signIn)}
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
