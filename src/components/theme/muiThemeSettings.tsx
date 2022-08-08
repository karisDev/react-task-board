import { createTheme, Components, ThemeOptions } from "@mui/material/styles";

const muiComponentSettings: Components<any> = {
  MuiTextField: {
    defaultProps: {
      fullWidth: true,
      InputProps: { style: { fontSize: 25 } },
      InputLabelProps: { style: { fontSize: 15 } },
      variant: "standard",
    },
  },
  MuiSkeleton: {
    defaultProps: {
      animation: "wave",
    },
  },
};
export const muiDarkThemeSettings: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
  components: muiComponentSettings,
};
export const muiLightThemeSettings: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#343434",
    },
  },
  components: muiComponentSettings,
};
