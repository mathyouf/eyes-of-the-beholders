import { Box } from "@mui/material";
import ImageRatingSection from "./ImageRatingSection";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

export default function ImageRatingContainer({ imageSets }) {
  return (
    <Box
      className="image-rating-container-wrapper image-rating-container"
      sx={{
        height: "100vh",
        gridRow: "3",
        gridColumn: "1 / -1",
        overflow: "hidden",
      }}
    >
      {imageSets.map((imageSet, index) => (
        <ImageRatingSection
          key={index}
          id={index}
          imageSet={imageSet}
          imageSets={imageSets}
          index={index}
        />
      ))}
    </Box>
  );
}
