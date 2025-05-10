import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import TitleBar from "./components/TitleBar";
import FortunePapers from "./components/FortunePapers";
import { FortuneProvider } from "./context/FortuneProvider";
import { DialogsProvider } from "@toolpad/core";

let theme = createTheme({
  palette: {
    primary: {
      main: "#d8127e",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});
theme = responsiveFontSizes(theme);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <DialogsProvider>
        <FortuneProvider>
          <CssBaseline />
          <Box
            sx={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <TitleBar />
            <FortunePapers />
            <Box
              sx={{
                position: "absolute",
                bottom: (theme) => theme.spacing(2),
                display: "flex",
                gap: 1,
              }}
            >
              {/* TODO: add fortune button */}
            </Box>
          </Box>
        </FortuneProvider>
      </DialogsProvider>
    </ThemeProvider>
  );
};

export default App;
