import { Box, Typography } from "@material-ui/core";
import React from "react";
// components
import CloudImage from "./CloudImage";

const AvatarWithUserName = ({
  publicId,
  width,
  uploadPreset,
  height = null,
  radius,
  crop = null,
  userName,
}) => (
  <Box display="flex" alignItems="center" justifyContent="start" gridGap={10} my={1}>
    {height ? (
      <CloudImage
        publicId={publicId}
        width={width}
        height={height}
        radius={radius}
        uploadPreset={uploadPreset}
        crop={crop}
      />
    ) : (
      <CloudImage publicId={publicId} width={width} crop={crop} uploadPreset={uploadPreset} />
    )}
    <Typography variant="body1" color="textSecondary">
      {userName}
    </Typography>
  </Box>
);

export default AvatarWithUserName;
