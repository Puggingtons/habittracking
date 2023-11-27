import { ThemeOptions } from '@mui/material/styles';

//Theme builder: https://zenoo.github.io/mui-theme-creator/

  //Backgroung color: #121212
  //Window color: #181818
  //Primary color: #509cf5

//   width: "350px",
//   height: "auto",
//   align-items: "center",
//   margin: "auto",
//   border-radius: "20px",

export const dark: ThemeOptions = {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
            color: "white",
            margin: "10px",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            width: "350px",
            height: "auto",
            alignItems: "center",
            margin: "auto",
            borderRadius: "20px",
            alignSelf: "center",
            backgroundColor: "#181818",
          },
        },
      },
      },
    palette: {
      mode: 'dark',
      primary: {
        main: '#509cf5',
      },
      secondary: {
        main: '#8483f1',
      },
      background: {
        paper: '#181818',
      },
      text: {
        primary: '#ffffff',
      }
    },
};