// components/CheckboxGroup.js
import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';

export default function CheckboxGroup({ preference, currentPreference, handlePreferencesChange }) {
  const [selected, setSelected] = React.useState(currentPreference);

  const handleChange = (event) => {
    const updatedSelected = event.target.checked 
      ? [...selected, event.target.name]
      : selected.filter((item) => item !== event.target.name);

    setSelected(updatedSelected);
    handlePreferencesChange(preference.name, updatedSelected);
  };

  return (
    <div>
      <Typography variant="h6">{preference.name}</Typography>
      <FormGroup row>
        {preference.options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox 
                checked={selected.includes(option)} 
                onChange={handleChange} 
                name={option} 
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </div>
  );
}
