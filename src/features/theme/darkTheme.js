import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8338ec",
      light: "rgba(199, 125, 255, 0.2)",
      dark: "#3c096c",
    },
    secondary: {
      main: "#eef4ed",
      light: "rgba(238, 244, 237, 0.7)",
    },
    success: {
      main: "#52b788",
      light: "#b7e4c7",
      dark: "#1b4332",
    },
    warning: {
      main: "#ffb700",
      light: "rgba(255, 234, 0, 1)",
      dark: "#ff7b00",
    },
    error: {
      main: "#d62828",
      light: "#364156",
      dark: "#eef4ed",
    },
    background: {
      default: "#001233",
      paper: "#001845",
    },
    text: {
      primary: "#eef4ed",
      secondary: "#8d99ae",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: "1.5rem",
      fontWeight: "600",
      lineHeight: "1.2",
      letterSpacing: "0.015rem",
    },
    h2: {
      fontSize: "1.3rem",
      fontWeight: "600",
      lineHeight: "1.2",
      letterSpacing: "0.015rem",
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: "600",
      lineHeight: "1.2",
      letterSpacing: "0.015rem",
    },
    h4: {
      fontSize: "1.1rem",
      fontWeight: "600",
      lineHeight: "1.2",
      letterSpacing: "0.015rem",
    },
    h5: {
      fontSize: "1rem",
      fontWeight: "600",
      lineHeight: "1.2",
      letterSpacing: "0.015rem",
    },
    h6: {
      fontSize: "0.9rem",
      fontWeight: "600",
      lineHeight: "1.2",
      letterSpacing: "0.015rem",
    },
    subtitle1: {
      fontSize: "1.1rem",
      fontWeight: "500",
      lineHeight: "1.2",
      letterSpacing: "0.015rem",
    },
    subtitle2: {
      fontSize: "1rem",
      fontWeight: "500",
      lineHeight: "1.2",
      letterSpacing: "0.015rem",
    },
    body1: {
      fontSize: "0.8rem",
      fontWeight: "400",
      lineHeight: "1.2",
    },
    body2: {
      fontSize: "0.7rem",
      fontWeight: "400",
      lineHeight: "1.2",
    },
    caption: {
      fontSize: "0.7rem",
      fontWeight: "300",
    },
    button: {
      fontSize: "0.8rem",
      fontWeight: "500",
      textTransform: "capitalize",
    },
  },
  spacing: 10,
  shape: {
    borderRadius: "4px",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#001233",
        },
      },
    },
  },
});

export default darkTheme;
