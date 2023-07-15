// // // components/ImageRatingSection.js

// import { Box } from "@mui/material";
// import ImageRatingCard from "./ImageRatingCard";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useEffect, useState, useRef } from "react";
// import { memo, useMemo } from "react";
// import * as THREE from "three";
// import { Button } from "@mui/material";
// import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
// import niceColors from "nice-color-palettes";
// import { Effects } from "@react-three/drei";
// import { SSAOPass, UnrealBloomPass } from "three-stdlib";
// import ReactDOM from "react-dom";

// export default function ImageRatingSection({ className, imageSet, index }) {
//   const MemoizedImageRatingCard = memo(ImageRatingCard);

//   const [imageSetState, setImageSetState] = useState(imageSet);
//   const [renderedComponents, setRenderedComponents] = useState([]);
//   const [isButtonClicked, setIsButtonClicked] = useState(false);
//   const [showVisualization, setShowVisualization] = useState(false);
//   const [visualizationDone, setVisualizationDone] = useState(false);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;
//     const items = Array.from(imageSetState);
//     console.log(imageSetState);
//     console.log(items[result.source.index].scores[0].value);
//     console.log(items[result.destination.index].scores[0].value);

//     const disableDragging =
//       result.destination.index < result.source.index &&
//       items[result.destination.index].scores[0].value >
//         items[result.source.index].scores[0].value;
//     console.log(disableDragging);
//     if (!disableDragging) {
//       const [reorderedItem] = items.splice(result.source.index, 1);
//       items.splice(result.destination.index, 0, reorderedItem);
//       console.log(items);
//       return setImageSetState(items);
//     } else {
//       return imageSetState;
//     }
//   };

//   const updateRating = (cardIndex, updatedScores) => {
//     const updatedImageSet = imageSetState.map((image, index) => {
//       if (index === cardIndex) {
//         return { ...image, scores: updatedScores };
//       }
//       return image;
//     });
//     setImageSetState(updatedImageSet);
//   };
//   useEffect(() => {
//     if (index === 1 && isButtonClicked) {
//       setShowVisualization(true);
//       setTimeout(() => {
//         setShowVisualization(false);
//         setVisualizationDone(true);
//       }, 5000);
//     }
//   }, [index, isButtonClicked]);

//   useEffect(() => {
//     console.log(index);
//     console.log("Updated imageSetState:", imageSetState);
//     const components = imageSetState.map((image, index) => (
//       <Draggable key={image.id} draggableId={`${image.id}`} index={index}>
//         {(provided) => (
//           <div
//             key={image.id}
//             ref={provided.innerRef}
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//             className={`image-rating-card-wrapper image-rating-card image-rating-card-${index}`}
//           >
//             <MemoizedImageRatingCard
//               image={image}
//               index={index}
//               key={image.id}
//               updateRating={updateRating}
//             />
//           </div>
//         )}
//       </Draggable>
//     ));
//     setRenderedComponents(components);
//   }, [imageSetState, isButtonClicked]);

//   useEffect(() => {
//     if (showVisualization) {
//       // Three.js Visualization
//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(
//         100,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000
//       );
//       const renderer = new THREE.WebGLRenderer();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       const visualizationContainer = document.getElementById(
//         "visualization-container"
//       );
//       console.log(visualizationContainer);
//       visualizationContainer.appendChild(renderer.domElement);
//       const x = 0,
//         y = 0;

//       const heartShape = new THREE.Shape();

//       heartShape.moveTo(x + 5, y + 5);
//       heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
//       heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
//       heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
//       heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
//       heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
//       heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
//       const geometry = new THREE.ShapeGeometry(heartShape);
//       const material = new THREE.MeshBasicMaterial({ color: 0xaa00ff });
//       const cube = new THREE.Mesh(geometry, material);
//       scene.add(cube);

//       camera.position.z = 35;

//       function animate() {
//         requestAnimationFrame(animate);

//         cube.rotation.x += 0.01;
//         cube.rotation.y += 0.05;

//         renderer.render(scene, camera);
//       }

//       animate();

//       return () => {
//         // Cleanup code when component unmounts
//         visualizationContainer.removeChild(renderer.domElement);
//       };
//     }
//   }, [showVisualization]);

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId={`rating-card-${index}`}>
//         {(provided) => (
//           <Box
//             className={`image-rating-card-column-wrapper image-rating-card-column ${className} button-clicked-${isButtonClicked} visualization-shown-${showVisualization}
//             visualization-done-${visualizationDone}`}
//             sx={{
//               display: "grid",
//               overflow: "auto",
//               width: "100%",
//               ...(isButtonClicked && {
//                 "&.section-2 .train-button": {
//                   display: "none",
//                 },
//                 "&.section-2 .image-rating-card-wrapper": {
//                   display: "grid",
//                 },
//               }),
//             }}
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//           >
//             {index === 1 && (
//               <>
//                 <div
//                   className="visualization-container"
//                   id="visualization-container"
//                 >
//                   {/* Three.js Visualization Code Here */}
//                 </div>

//                 {!isButtonClicked && !showVisualization && (
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     className="train-button"
//                     onClick={() => setIsButtonClicked(true)}
//                   >
//                     Train
//                   </Button>
//                 )}
//               </>
//             )}

//             {renderedComponents}
//             {provided.placeholder}
//           </Box>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// }

import { Box, Button } from "@mui/material";
import ImageRatingCard from "./ImageRatingCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { memo } from "react";
import * as THREE from "three";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import niceColors from "nice-color-palettes";
import { Effects } from "@react-three/drei";
import { SSAOPass, UnrealBloomPass } from "three-stdlib";
import ReactDOM from "react-dom";

const SectionWithVisualization = ({ index, className, onTrainButtonClick }) => {
  const [showVisualization, setShowVisualization] = useState(false);
  const [visualizationDone, setVisualizationDone] = useState(false);

  useEffect(() => {
    if (showVisualization) {
      // Three.js Visualization
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        100,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      const visualizationContainer = document.getElementById(
        `visualization-container-${className}`
      );
      visualizationContainer.appendChild(renderer.domElement);
      const x = 0,
        y = 0;

      const heartShape = new THREE.Shape();

      heartShape.moveTo(x + 5, y + 5);
      heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
      heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
      heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
      heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
      heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
      heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
      const geometry = new THREE.ShapeGeometry(heartShape);
      const material = new THREE.MeshBasicMaterial({ color: 0xaa00ff });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 35;

      function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.05;

        renderer.render(scene, camera);
      }

      animate();

      return () => {
        // Cleanup code when component unmounts
        visualizationContainer.removeChild(renderer.domElement);
      };
    }
  }, [showVisualization]);

  const handleTrainButtonClick = () => {
    setShowVisualization(true);
    setTimeout(() => {
      setShowVisualization(false);
      setVisualizationDone(true);
      document
        .getElementById(`section-wrapper-${index}`)
        .classList.remove("visualization-done-false");
      document
        .getElementById(`section-wrapper-${index}`)
        .classList.add("visualization-done-true");
    }, 3000);
    onTrainButtonClick();
  };

  return (
    <>
      <div
        className={`visualization-container ${className}`}
        id={`visualization-container-${className}`}
      >
        {/* Three.js Visualization Code Here */}
      </div>

      {!showVisualization && (
        <Button
          variant="contained"
          color="primary"
          className={`train-button ${className}`}
          onClick={handleTrainButtonClick}
        >
          Train
        </Button>
      )}
    </>
  );
};

export default function ImageRatingSection({ className, imageSet, index }) {
  const MemoizedImageRatingCard = memo(ImageRatingCard);

  const [imageSetState, setImageSetState] = useState(imageSet);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(imageSetState);
    console.log(imageSetState);
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
    console.log(index);
    console.log("Updated imageSetState:", imageSetState);
  }, [imageSetState]);

  const handleTrainButtonClick = () => {
    setIsButtonClicked(true);
    document
      .getElementById(`section-wrapper-${index}`)
      .classList.remove("button-clicked-false");
    document
      .getElementById(`section-wrapper-${index}`)
      .classList.add("button-clicked-true");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={`rating-card-${index}`}>
        {(provided) => (
          <Box
            className={`image-rating-card-column-wrapper image-rating-card-column ${className} button-clicked-${isButtonClicked}`}
            id={`${className}`}
            sx={{
              display: "grid",
              overflow: "auto",
              width: "100%",
              ...(isButtonClicked && {
                "&.section-2 .train-button": {
                  display: "none",
                },
                "&.section-2 .image-rating-card-wrapper": {
                  display: "grid",
                },
              }),
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {index !== 0 && (
              <SectionWithVisualization
                index={index}
                className={className}
                onTrainButtonClick={handleTrainButtonClick}
              />
            )}

            {imageSetState.map((image, index) => (
              <Draggable
                key={image.id}
                draggableId={`${image.id}`}
                index={index}
              >
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
            ))}

            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}
