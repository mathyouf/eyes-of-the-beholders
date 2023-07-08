// components/ImageRatingContainer.js

import { Box } from "@mui/material";
import ImageRatingSection from "./ImageRatingSection";

export default function ImageRatingContainer({ imageSets }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 3,
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      {imageSets.map((imageSet, index) => (
        <ImageRatingSection key={index} imageSet={imageSet} />
      ))}
    </Box>
  );
}
