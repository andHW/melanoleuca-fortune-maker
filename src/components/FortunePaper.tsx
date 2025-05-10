import { Box, Typography } from "@mui/material";
import { type Fortune } from "../types/fortuneTypes";
import { useFortune } from "../context/useFortune";

interface FortunePaperProps {
  fortune: Fortune;
  onClick: () => void;
}

const FortunePaper = ({ fortune, onClick }: FortunePaperProps) => {
  const { globalBrandName } = useFortune();

  return (
    <Box
      sx={{
        width: "60mm",
        height: "17mm",
        padding: "3mm 6mm",
        bgcolor: "#fff",
        border: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "center",
        boxSizing: "border-box",
        fontFamily: "Helvetica Neue",
        textTransform: "uppercase",
        color: (theme) => theme.palette.primary.main,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Typography
        sx={{
          fontSize: "7pt",
          fontWeight: "lighter",
          lineHeight: 1.3,
        }}
      >
        {fortune.applyLocalFortuneText
          ? fortune.localFortuneText
          : "Default Fortune"}
      </Typography>
      <Typography
        sx={{
          fontSize: "5pt",
          fontFamily: `Arial`,
          fontWeight: "bold",
        }}
      >
        {fortune.applyLocalBrandName ? fortune.localBrandName : globalBrandName}
      </Typography>
    </Box>
  );
};

export default FortunePaper;
