// components/ImageRatingSection.js

import { Box } from "@mui/material";
import ImageRatingCard from "./ImageRatingCard";

export default function ImageRatingSection({ imageSet }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "repeat(auto-fill, 1fr)",
        gridGap: "10px",
        height: "100vh", // Set to viewport height
        overflowY: "auto",
        width: "33%", // If there are 3 columns
      }}
    >
      {imageSet.map((image, index) => (
        <ImageRatingCard key={index} image={image} />
      ))}
    </Box>
  );
}
