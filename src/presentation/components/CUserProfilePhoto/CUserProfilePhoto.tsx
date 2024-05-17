import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "../../hooks/useAppTheme";
import { CModal } from "../CModal/CModal";
import { CButton } from "../CButton/CButton";
import { useUserProfilePhoto } from "../../../useCases/profile/useUserProfilePhoto";
import { CActivityIndicator } from "../CActivityIndicator/CActivityIndicator";
import { useNavigation } from "@react-navigation/native";

interface CUserPhotoProps {
  photoURL: string;
  isPostPhoto?: boolean;
  userId?: string;
  isUserLoged?: boolean;
}

export function CUserProfilePhoto({
  photoURL,
  isPostPhoto = false,
  userId,
  isUserLoged,
}: CUserPhotoProps) {
  const { colors } = useAppTheme();
  const {
    isLoadingPhoto,
    changedPhotoUrl,
    isModalPickImage,
    pickImageCamera,
    pickImageGallery,
    toggleModalUserPhoto,
  } = useUserProfilePhoto();

  const { navigate } = useNavigation();

  return (
    <View
      style={{
        width: isPostPhoto ? 50 : 135,
        height: isPostPhoto ? 50 : 135,
        backgroundColor: colors.gray4,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.bluePrimary,
        position: "relative",
      }}
    >
      {isPostPhoto && (
        <TouchableOpacity
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
          onPress={() => navigate("PostProfileScreen", { userId })}
        />
      )}
      {!isPostPhoto && isUserLoged && (
        <TouchableOpacity
          onPress={toggleModalUserPhoto}
          activeOpacity={0.7}
          style={{
            position: "absolute",
            backgroundColor: colors.bluePrimary,
            zIndex: 9,
            right: 0,
            bottom: 0,
            borderRadius: 25,
            padding: 8,
          }}
        >
          <MaterialIcons name="mode-edit" size={20} color={colors.grayWhite} />
        </TouchableOpacity>
      )}

      {photoURL || changedPhotoUrl ? (
        <>
          {isLoadingPhoto ? (
            <CActivityIndicator color="bluePrimary" />
          ) : (
            <Image
              source={{ uri: changedPhotoUrl || photoURL }}
              style={{
                width: isPostPhoto ? 50 : 130,
                height: isPostPhoto ? 50 : 130,
                borderRadius: 100,
              }}
            />
          )}
        </>
      ) : (
        <FontAwesome5
          name="user-graduate"
          size={isPostPhoto ? 30 : 70}
          color={colors.bluePrimary}
        />
      )}

      <CModal
        title={"Alterar foto de perfil"}
        visible={isModalPickImage}
        onClose={toggleModalUserPhoto}
        children={
          <>
            <CButton
              title={"Tirar uma foto"}
              onPress={pickImageCamera}
              mb="s10"
              mt="s10"
            />
            <CButton
              title={"Escolher da galeria"}
              onPress={pickImageGallery}
              mb="s10"
            />
          </>
        }
      />
    </View>
  );
}
