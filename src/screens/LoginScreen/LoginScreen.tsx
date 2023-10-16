import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { CTextInput } from "../../components/CTextInput/CTextInput";
import { CText } from "../../components/CText/CText";
import { CButton } from "../../components/CButton/CButton";
import { CScreen } from "../../components/CScreen/CScreen";
import { CBox, CTouchableOpacityBox } from "../../components/CBox/CBox";
import { Keyboard, ScrollView } from "react-native";
import { useAuth } from "../../hooks/useAuth";

export function LoginScreen() {
  const [createAccount, setCreateAccount] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = React.useState("Junior");
  const [email, setEmail] = React.useState("lauchzerjr@gmail.com");
  const [password, setPassword] = React.useState("123456");

  const {
    isLoading,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } = useAuth();

  const renderRightIconEye = () => {
    return (
      <CTouchableOpacityBox onPress={() => setShowPassword(!showPassword)}>
        {showPassword ? (
          <FontAwesome5 name="eye-slash" size={20} color="#005999" />
        ) : (
          <FontAwesome5 name="eye" size={20} color="#005999" />
        )}
      </CTouchableOpacityBox>
    );
  };

  const signIn = async () => {
    await signInWithEmailAndPassword(email, password);
    Keyboard.dismiss();
  };

  const signUp = async () => {
    await createUserWithEmailAndPassword(name, email, password);
    Keyboard.dismiss();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      style={{ marginBottom: 20 }}
    >
      <CScreen>
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
          Explore cursos, postagens de alunos de outras faculdades e conecte-se
          ao aprendizado de forma direta e interativa.
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
          <CTextInput
            iconRight={
              <FontAwesome5 name="user-alt" size={20} color="#005999" />
            }
            boxProps={{ mb: "s10" }}
            label="Nome"
            placeholder="Digite seu nome"
            onChangeText={setName}
            value={name}
          />
        )}

        <CTextInput
          iconRight={<Feather name="at-sign" size={20} color="#005999" />}
          boxProps={{ mb: "s10" }}
          label="E-mail acadêmico"
          placeholder="Digite seu e-mail acadêmico"
          onChangeText={setEmail}
          value={email}
        />

        <CTextInput
          iconRight={renderRightIconEye()}
          secureTextEntry={!showPassword ? true : false}
          boxProps={{ mb: "s20" }}
          placeholder="Digite sua senha"
          label="Senha"
          onChangeText={setPassword}
          value={password}
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
          mt={createAccount ? "s12" : "s20"}
          title={createAccount ? "Cadastrar" : "Entrar"}
          onPress={createAccount ? signUp : signIn}
        />
        <CButton
          mt="s12"
          preset="outline"
          title={createAccount ? "Já tenho uma conta" : "Criar uma conta"}
          onPress={() => setCreateAccount(!createAccount)}
        />
      </CScreen>
    </ScrollView>
  );
}
