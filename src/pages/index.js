// pages/index.js
import { useDispatch, useSelector } from 'react-redux';
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
import ImageRatingContainer from '../components/ImageRatingContainer';
import { setImageSet } from '../store/reducers/images';


export default function Home() {
  const dispatch = useDispatch();

  //// Preferences ////
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

  //// Images ////
  const defaultImageSet = [
    [
      // Column 1
      {
        url: "https://c-lj.gnst.jp/public/img/spot/lj/00/07/lj0007552/lj0007552_5b8390a25d8e6_main.jpg?20190128040046",
        caption: "Cat 1",
        scores: [
          { modelId: "aestheticDefault", value: 5 },
          { modelId: "desirabilityDefault", value: 7 },
        ],
      },
      {
        url: "https://www.tiendanimal.pt/blog/wp-content/uploads/2021/08/Como-escolher-o-tipo-de-areia-adequada-para-o-teu-gato.jpg",
        caption: "Cat 2",
        scores: [
          { modelId: "aestheticDefault", value: 4 },
          { modelId: "desirabilityDefault", value: 6 },
        ],
      },
      {
        url: "https://www.bluebox-tube.com/pet/data/photo/751be3528f373d447950343f956cbb82797eebb5.JPG",
        caption: "Cat 3",
        scores: [
          { modelId: "aestheticDefault", value: 4 },
          { modelId: "desirabilityDefault", value: 6 },
        ],
      },
      {
        url: "https://i.pinimg.com/originals/40/1c/48/401c4885e7bb004c4b2ee39f0a9d4bfc.jpg",
        caption: "Cat 4",
        scores: [
          { modelId: "aestheticDefault", value: 4 },
          { modelId: "desirabilityDefault", value: 6 },
        ],
      },
      {
        url: "https://images-fe.ssl-images-amazon.com/images/I/31QtpTHGdGL.jpg",
        caption: "Cat 5",
        scores: [
          { modelId: "aestheticDefault", value: 4 },
          { modelId: "desirabilityDefault", value: 6 },
        ],
      },
      {
        url: "https://i.pinimg.com/564x/20/8d/ba/208dba1db9c5b348d4d8569114d45234.jpg",
        caption: "Cat 6",
        scores: [
          { modelId: "aestheticDefault", value: 4 },
          { modelId: "desirabilityDefault", value: 6 },
        ],
      },
      {
        url: "https://i.pinimg.com/originals/63/5c/3f/635c3f3e31fe37f91c25a2b257e1db16.jpg",
        caption: "Cat 7",
        scores: [
          { modelId: "aestheticDefault", value: 4 },
          { modelId: "desirabilityDefault", value: 6 },
        ],
      },
      {
        url: "https://www.charmainegrayphoto.com/wp-content/uploads/2021/01/2048_96_watermark_20200126_SPOT_Foster_Animals_CGP_6582-Edit-768x1152.jpg",
        caption: "Cat 8",
        scores: [
          { modelId: "aestheticDefault", value: 4 },
          { modelId: "desirabilityDefault", value: 6 },
        ],
      },
      {
        url: "http://cn1.nevsedoma.com.ua/images/2008/52/4/cats_190.jpg",
        caption: "Cat 9",
        scores: [
          { modelId: "aestheticDefault", value: 4 },
          { modelId: "desirabilityDefault", value: 6 },
        ],
      },
      {
        url: "https://i.pinimg.com/736x/ab/7d/d6/ab7dd669f5118e17719e01e7c6cf1ce5.jpg",
        caption: "Cat 10",
        scores: [
          { modelId: "aestheticDefault", value: 4 },
          { modelId: "desirabilityDefault", value: 6 },
        ],
      },
      //... 8 more images for column 1
    ],
    [
      // Column 2
        // Column 1
        {
          url: "https://c-lj.gnst.jp/public/img/spot/lj/00/07/lj0007552/lj0007552_5b8390a25d8e6_main.jpg?20190128040046",
          caption: "Cat 1",
          scores: [
            { modelId: "aestheticDefault", value: 5 },
            { modelId: "desirabilityDefault", value: 7 },
          ],
        },
        {
          url: "https://www.tiendanimal.pt/blog/wp-content/uploads/2021/08/Como-escolher-o-tipo-de-areia-adequada-para-o-teu-gato.jpg",
          caption: "Cat 2",
          scores: [
            { modelId: "aestheticDefault", value: 4 },
            { modelId: "desirabilityDefault", value: 6 },
          ],
        }  
    ],
    [
      // Column 3
      // 10 images with similar structure as above
    ],
  ];
  
  useEffect(() => {
    dispatch(setImageSet(defaultImageSet)); // Load default image data into Redux
  }, []);
  const imageSet = useSelector(state => state.images.imageSet);

  return (
<Container
  sx={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    overflow: 'auto',
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
      <ImageRatingContainer imageSets={imageSet} />
    </Container>
  );
}
