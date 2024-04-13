import { userInfosApi } from "./../../services/user.service";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import * as ImagePicker from "expo-image-picker";
import { useToast } from "../../hooks/useToast";

interface ImageOptionsProps {
  mediaTypes: ImagePicker.MediaTypeOptions.Images;
  allowsEditing: boolean;
  aspect: [number, number];
  quality: number;
}

export function useUserProfilePhoto() {
  const { addToast } = useToast();
  const { user } = useAuth();

  const [isModalPickImage, setIsModalPickImage] = useState(false);
  const [changedPhotoUrl, setChangedPhotoUrl] = useState("");

  const imageOptions: ImageOptionsProps = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  };

  const uploadUserProfilePhotoProfile = async (uri: string) => {
    try {
      const { task, ref } = await userInfosApi.uploadUserProfilePhoto(
        uri,
        user.uid
      );

      task.then(async () => {
        const url = await ref.getDownloadURL();
        userInfosApi.saveUserProfilePhoto(user.uid, url);
        setChangedPhotoUrl(url);
      });

      addToast({
        message: "Foto alterada com sucesso",
        type: "success",
      });
      toggleModalUserPhoto();
    } catch (error) {
      addToast({
        message: "Falha ao alterar foto de perfil",
        type: "error",
      });
    }
  };

  const pickImageCamera = async () => {
    try {
      if (ImagePicker.PermissionStatus.UNDETERMINED) {
        await ImagePicker.requestCameraPermissionsAsync();
      }

      const cameraStatus = await (
        await ImagePicker.getCameraPermissionsAsync()
      ).granted;

      if (!cameraStatus) {
        addToast({
          message: "Você não autorizou o uso da câmera",
          type: "error",
        });
        toggleModalUserPhoto();
        return;
      }

      const result = await ImagePicker.launchCameraAsync(imageOptions);

      if (!result.canceled) {
        uploadUserProfilePhotoProfile(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Erro ao abrir a camera => ", error);
    }
  };

  const pickImageGallery = async () => {
    try {
      if (ImagePicker.PermissionStatus.UNDETERMINED) {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      }

      const galleryStatus = await (
        await ImagePicker.getMediaLibraryPermissionsAsync()
      ).granted;

      if (!galleryStatus) {
        addToast({
          message: "Você não autorizou o uso da galeria",
          type: "error",
        });
        toggleModalUserPhoto();
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync(imageOptions);

      if (!result.canceled) {
        uploadUserProfilePhotoProfile(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Erro ao abrir a galeria => ", error);
    }
  };

  function toggleModalUserPhoto() {
    setIsModalPickImage((modal) => !modal);
  }

  return {
    changedPhotoUrl,
    isModalPickImage,
    pickImageCamera,
    pickImageGallery,
    toggleModalUserPhoto,
  };
}
