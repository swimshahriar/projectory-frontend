import { Image } from "cloudinary-react";
import React from "react";

const CloudImage = ({
  publicId,
  uploadPreset,
  width,
  height = null,
  crop = null,
  radius = null,
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
