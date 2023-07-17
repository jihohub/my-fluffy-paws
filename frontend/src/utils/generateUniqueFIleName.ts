const CryptoJS = require("crypto-js");

const generateUniqueFileName = (file: File | null): string => {
  const randomString = CryptoJS.lib.WordArray.random(16).toString(); // 랜덤한 문자열 생성
  const timestamp = Date.now(); // 현재 시간을 타임스탬프로 변환
  let extension;
  if (file !== null) {
    extension = file.name.split(".").pop(); // 파일의 확장자 추출
  }
  return `${timestamp}_${randomString}.${extension}`;
};

export default generateUniqueFileName;
