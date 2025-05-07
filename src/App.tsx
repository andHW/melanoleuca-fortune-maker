import { useRef, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, createTheme, responsiveFontSizes, TextField, ThemeProvider, Typography } from '@mui/material';
import html2canvas from "html2canvas";

let theme = createTheme({
  palette: {
    primary: {
      main: '#d1282e',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined'
      },
    }
  }
});
theme = responsiveFontSizes(theme);

const fortunes = [
  "You are as intelligent as you are good looking.",
  "A former acquaintance will unexpectedly resurface.",
];

function App() {
  const [fortune, setFortune] = useState(fortunes[0]);
  const [brandName, setBrandName] = useState("Ada Express");
  const fortuneRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const downloadFortune = async () => {
    if (!fortuneRef.current) return;
    const canvas = await html2canvas(fortuneRef.current, {
      backgroundColor: "#ffffff",
      scale: 4, // For higher resolution
    });
    const link = document.createElement("a");
    link.download = "fortune.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant='h1'
          sx={{
            position: 'absolute',
            top: (theme) => theme.spacing(1),
          }}
        >
          🐼
        </Typography>
        <Typography
          variant='h1'
          sx={{
            position: 'absolute',
            bottom: (theme) => theme.spacing(2),
            display: 'flex',
            gap: 1,
          }}
        >
          <TextField
            label="Fortune"
            value={fortune}
            onChange={(e) => setFortune(e.target.value)}
            slotProps={{htmlInput: { maxLength: 55 }}}
          />
          <TextField
            label="Brand Name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            slotProps={{htmlInput: { maxLength: 30 }}}
          />
        </Typography>


        <Box
          ref={fortuneRef}
          sx={{
            width: "78mm",
            height: "23mm",
            bgcolor: "#fff",
            border: "1px solid #ccc",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center",
            px: "6mm",
            py: "4mm",
            boxSizing: "border-box",
            fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
            textTransform: "uppercase",
            color: theme => theme.palette.primary.main,
          }}
        >
          <Typography
            sx={{
              fontSize: "10pt",
              fontWeight: "lighter",
              lineHeight: 1.3,
            }}
          >
            {fortune}
          </Typography>
          <Typography
            sx={{
              fontSize: "7pt",
              fontFamily: `Arial, sans-serif`,
              fontWeight: "bold",
            }}
          >
            {brandName}
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
