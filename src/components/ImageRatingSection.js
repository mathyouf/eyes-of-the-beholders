// components/ImageRatingSection.js

import { Box } from "@mui/material";
import ImageRatingCard from "./ImageRatingCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { memo } from "react";

export default function ImageRatingSection({ imageSet, imageSets, index }) {
  const MemoizedImageRatingCard = memo(ImageRatingCard);

  const [imageSetState, setImageSetState] = useState(imageSet);
  const [renderedComponents, setRenderedComponents] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(imageSetState);

    console.log(items[result.source.index].scores[0].value);
    console.log(items[result.destination.index].scores[0].value);

    const disableDragging =
      result.destination.index < result.source.index &&
      items[result.destination.index].scores[0].value >
        items[result.source.index].scores[0].value;
    console.log(disableDragging);
    if (!disableDragging) {
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      console.log(items);
      return setImageSetState(items);
    } else {
      return imageSetState;
    }
  };

  const updateRating = (cardIndex, updatedScores) => {
    const updatedImageSet = imageSetState.map((image, index) => {
      if (index === cardIndex) {
        return { ...image, scores: updatedScores };
      }
      return image;
    });
    setImageSetState(updatedImageSet);
  };

  useEffect(() => {
    console.log("Updated imageSetState:", imageSetState);
    const components = imageSetState.map((image, index) => (
      <Draggable key={image.id} draggableId={`${image.id}`} index={index}>
        {(provided) => (
          <div
            key={image.id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`image-rating-card-wrapper image-rating-card image-rating-card-${index}`}
          >
            <MemoizedImageRatingCard
              image={image}
              index={index}
              key={image.id}
              updateRating={updateRating}
            />
          </div>
        )}
      </Draggable>
    ));
    setRenderedComponents(components);
  }, [imageSetState]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={`rating-card-${index}`}>
        {(provided) => (
          <Box
            className={`image-rating-card-column-wrapper image-rating-card-column-${index}`}
            sx={{
              display: "grid",
              overflow: "auto",
              width: "100%",
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {renderedComponents}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}
