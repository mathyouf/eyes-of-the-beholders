// components/ImageRatingCard.js

import { Box, Slider, TextField } from "@mui/material";

export default function ImageRatingCard({ image }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: 3,
        mb: 3,
        height: "calc(100vh / 10)", // 100vh divided by the number of images
        img: {
          height: "100%",
          width: "auto",
        },
      }}
    >
      <img src={image.url} alt="" />
      <Slider defaultValue={image.scores.default} step={0.1} marks min={0} max={10} />
      <TextField
        variant="outlined"
        type="number"
        defaultValue={image.scores.default}
        inputProps={{ min: 0, max: 10, step: 0.1 }}
      />
    </Box>
  );
}
