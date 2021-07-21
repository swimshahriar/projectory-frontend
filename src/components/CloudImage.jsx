import React from "react";
import { Image } from "cloudinary-react";

const CloudImage = ({
  publicId,
  uploadPreset,
  width,
  height = null,
  crop = null,
  radius,
}) => {
  let btn;

  if (height) {
    btn = (
      <Image
        cloudName="swimshahriar"
        publicId={publicId}
        upload_preset={uploadPreset}
        width={width}
        height={height}
        radius={radius}
        crop={crop}
      />
    );
  } else {
    btn = (
      <Image
        cloudName="swimshahriar"
        publicId={publicId}
        upload_preset={uploadPreset}
        width={width}
        crop={crop}
      />
    );
  }

  return btn;
};

export default CloudImage;
