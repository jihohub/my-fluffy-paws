import generateUniqueFileName from "./generateUniqueFIleName";

const base64ToFile = (base64String: string, selectedImage: File | null) => {
  const byteCharacters = atob(base64String.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const fileN = generateUniqueFileName(selectedImage);

  const blob = new Blob(byteArrays, {
    type: `image/${fileN.split(".").pop()}`,
  }); // 이미지 타입에 맞게 수정
  return new File([blob], fileN, { type: `image/${fileN.split(".").pop()}` }); // 이미지 타입에 맞게 수정
};

export default base64ToFile;
