import React, { useState, useEffect, createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Styled from "./index.styles";

interface CropImageProps {
  image: File | null;
  croppedImage: string;
  onChangeImageUrl: (newImageUrl: string) => void;
}

export const CropImage: React.FC<CropImageProps> = ({
  image,
  croppedImage,
  onChangeImageUrl,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const cropperRef = createRef<ReactCropperElement>();

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as any);
      onChangeImageUrl(reader.result as any);
    };
    reader.readAsDataURL(image as Blob);
  }, []);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      onChangeImageUrl(
        cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
      );
    }
  };

  return (
    <Styled.CropContainer>
      <Cropper
        ref={cropperRef}
        style={{ height: 360, width: 360 }}
        zoomTo={0.5}
        initialAspectRatio={1}
        aspectRatio={1}
        preview=".img-preview"
        src={imageUrl}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        autoCropArea={1}
        background={false}
        responsive={true}
        checkOrientation={false}
        guides={true}
        cropend={getCropData}
        ready={getCropData}
      />
    </Styled.CropContainer>
  );
};

export default CropImage;
