import { userInfosApi } from "./../../services/user.service";
import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useAuthStore } from "../../stores/authStore";
import { useToastStore } from "../../stores/useToastStore";

interface ImageOptionsProps {
  mediaTypes: ImagePicker.MediaTypeOptions.Images;
  allowsEditing: boolean;
  aspect: [number, number];
  quality: number;
}

export function useUserProfilePhoto() {
  const showToast = useToastStore((state) => state.showToast);

  const user = useAuthStore((state) => state.user);

  const [isModalPickImage, setIsModalPickImage] = useState(false);
  const [changedPhotoUrl, setChangedPhotoUrl] = useState("");
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);

  const imageOptions: ImageOptionsProps = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  };

  const uploadUserProfilePhoto = useCallback(
    async (uri: string) => {
      try {
        const { task, ref } = await userInfosApi.uploadUserProfilePhoto(
          uri,
          user.uid
        );

        task.then(async () => {
          const url = await ref.getDownloadURL();
          await userInfosApi.saveUserProfilePhoto(user.uid, url);
        });

        setChangedPhotoUrl(uri);

        showToast({
          message: "Foto alterada com sucesso",
          type: "success",
        });
        toggleModalUserPhoto();
      } catch (error) {
        showToast({
          message: "Falha ao alterar foto de perfil",
          type: "error",
        });
      }
    },
    [changedPhotoUrl]
  );

  const pickImageCamera = async () => {
    try {
      setIsLoadingPhoto(true);
      if (ImagePicker.PermissionStatus.UNDETERMINED) {
        await ImagePicker.requestCameraPermissionsAsync();
      }

      const cameraStatus = await (
        await ImagePicker.getCameraPermissionsAsync()
      ).granted;

      if (!cameraStatus) {
        showToast({
          message: "Você não autorizou o uso da câmera",
          type: "error",
        });
        setIsLoadingPhoto(false);
        toggleModalUserPhoto();
        return;
      }

      const result = await ImagePicker.launchCameraAsync(imageOptions);
      if (!result.canceled) {
        await uploadUserProfilePhoto(result.assets[0].uri);
      }
      setIsLoadingPhoto(false);
    } catch (error) {
      setIsLoadingPhoto(false);
      console.log("Erro ao abrir a camera => ", error);
    }
  };

  const pickImageGallery = async () => {
    try {
      setIsLoadingPhoto(true);
      if (ImagePicker.PermissionStatus.UNDETERMINED) {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      }

      const galleryStatus = await (
        await ImagePicker.getMediaLibraryPermissionsAsync()
      ).granted;

      if (!galleryStatus) {
        showToast({
          message: "Você não autorizou o uso da galeria",
          type: "error",
        });
        setIsLoadingPhoto(false);
        toggleModalUserPhoto();
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync(imageOptions);

      if (!result.canceled) {
        await uploadUserProfilePhoto(result.assets[0].uri);
      }

      setIsLoadingPhoto(false);
    } catch (error) {
      setIsLoadingPhoto(false);
      console.log("Erro ao abrir a galeria => ", error);
    }
  };

  function toggleModalUserPhoto() {
    setIsModalPickImage((modal) => !modal);
  }

  return {
    isLoadingPhoto,
    changedPhotoUrl,
    isModalPickImage,
    pickImageCamera,
    pickImageGallery,
    toggleModalUserPhoto,
  };
}
