import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1CBF73",
      light: "#A1F4C0",
    },
    secondary: {
      main: "#FF61AD",
    },
    text: {
      primary: "#222425",
      secondary: "#404145",
    },
  },
  typography: {
    fontFamily: "Hind Vadodara, sans-serif",
    h1: { fontFamily: "Montserrat, sans-serif" },
    h2: { fontFamily: "Montserrat, sans-serif" },
    h3: { fontFamily: "Lora, serif" },
    h4: { fontFamily: "Lora, serif" },
    h5: { fontFamily: "Lora, serif" },
    h6: { fontFamily: "Lora, serif" },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
