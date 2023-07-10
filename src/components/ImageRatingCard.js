import { Box, TextField, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function ImageRatingCard({
  image,
  index,
  updateRating,
  disableDragging,
}) {
  const [sliderValue, setSliderValue] = useState(image["scores"][0].value);

  useEffect(() => {
    setSliderValue(image["scores"][0].value);
  }, [image]);

  // console.log(image["scores"]);
  const handleRangeChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      setSliderValue(newValue);
    }
  };

  const handleTextboxChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      setSliderValue(newValue);
    }
  };

  const decreaseValue = () => {
    setSliderValue((prevValue) => {
      const newValue = Math.max(prevValue - 0.1, 0);
      updateRatingValue(newValue);
      return newValue;
    });
  };

  const increaseValue = () => {
    setSliderValue((prevValue) => {
      const newValue = Math.min(prevValue + 0.1, 10);
      sliderValue = newValue;
      updateRatingValue();
      return newValue;
    });
  };

  const updateRatingValue = () => {
    let updatedScores;

    if (Array.isArray(image.scores)) {
      updatedScores = image.scores.map((score) => {
        if (score.modelId === "aestheticDefault") {
          return { ...score, value: sliderValue };
        }
        return score;
      });
    } else {
      updatedScores = [{ modelId: "aestheticDefault", value: sliderValue }];
    }

    updateRating(index, updatedScores);
  };

  return (
    <>
      <img src={image.url} alt={image.index} />
      <div className="image-rating-box">
        <IconButton
          className="image-rating-decrease-btn"
          onClick={decreaseValue}
          disabled={sliderValue <= 0}
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          className="image-rating-textbox"
          variant="outlined"
          type="number"
          value={sliderValue}
          inputProps={{ min: 0, max: 10, step: 0.1 }}
          onChange={handleTextboxChange}
          onBlur={updateRatingValue}
          sx={{
            width: 80,
            margin: "0px 5px",
            textAlign: "center",
          }}
        />
        <IconButton
          className="image-rating-increase-btn"
          onClick={increaseValue}
          disabled={sliderValue >= 10}
        >
          <AddIcon />
        </IconButton>
      </div>
      <input
        className="image-rating-slider"
        type="range"
        min={0}
        step={0.1}
        max={10}
        value={sliderValue}
        onChange={handleRangeChange}
        onMouseUp={updateRatingValue}
        onTouchEnd={updateRatingValue}
        sx={{
          width: 300,
          height: 10,
          padding: "15px 0px",
          margin: "0px 10px",
          background: "linear-gradient(to right, #c9c9c9, #c9c9c9)",
          outline: "none",
          border: "none",
          appearance: "none",
          borderRadius: 5,
        }}
      />
    </>
  );
}
