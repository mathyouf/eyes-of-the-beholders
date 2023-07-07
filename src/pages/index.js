// pages/index.js
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  Typography,
  Toolbar,
} from "@mui/material";
import PreferencesWidget from '../components/PreferencesWidget';
import { setPreferences } from '../store/reducers/preferences';

export default function Home() {
  const dispatch = useDispatch();

  const preferencesSchema = [
    {
      name: "Gender",
      options: ["Male", "Female", "Other"],
      default: ["Male"]
    },
    {
      name: "Age Range",
      options: ["0-18", "19-35", "36-60", "60+"],
      default: ["19-35"]
    },
    // Add more preferences here...
  ];

  const initialPreferencesState = preferencesSchema.reduce((acc, curr) => {
    acc[curr.name] = curr.default || [];
    return acc;
  }, {});
  
  const [preferences, setPreferencesState] = useState(initialPreferencesState);
  
  const handlePreferencesChange = (name, values) => {
    dispatch(setPreferences({ name, values }));
    // Also update our local state
    setPreferencesState(prevState => {
      const newState = {...prevState, [name]: values};
      return newState;
    });
  };

  useEffect(() => {
    console.log(preferences);
  }, [preferences]);

  return (
    <Container
  sx={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
      <Typography variant="h4" component="h1" gutterBottom>
        Eyes of the Beholders!
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          mt: 3,
        }}
      >
        {Object.keys(preferences).length === preferencesSchema.length &&
          preferencesSchema.map((preference, index) => (
           <PreferencesWidget 
           key={index} 
           preference={preference} 
           handlePreferencesChange={handlePreferencesChange} 
           currentPreferences={preferences}
         />
          ))}
      </Box>
    </Container>
  );
}
