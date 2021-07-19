import React from "react";
import { Image } from "cloudinary-react";

const CloudImage = ({ publicId, uploadPreset, width, crop }) => {
  return (
    <Image
      cloudName="swimshahriar"
      publicId={publicId}
      upload_preset={uploadPreset}
      width={width}
      crop={crop}
    />
  );
};

export default CloudImage;
