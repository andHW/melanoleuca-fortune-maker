import { Typography, Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDialogs } from "@toolpad/core";
import { useFortune } from "../context/useFortune";
import GlobalConfigDialog from "./GlobalConfigDialog";

const TitleBar = () => {
  const {
    globalBrandName,
    setGlobalBrandName,
    globalFortuneText,
    setGlobalFortuneText,
    maxNumberOfFortunes,
    minNumberOfFortunes,
    fortunes,
    handleAddFortune,
    handleRemoveFortune,
  } = useFortune();
  const fortuneCount = fortunes.length;

  const dialogs = useDialogs();

  const handleOpenDialog = async () => {
    const result = await dialogs.open(GlobalConfigDialog, {
      brandName: globalBrandName,
      fortuneText: globalFortuneText,
      maxNumberOfFortunes
    });

    if (result) {
      setGlobalBrandName(result.brandName);
      setGlobalFortuneText(result.fortuneText);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: (theme) => theme.spacing(1),
        gap: (theme) => theme.spacing(8),
      }}
    >
      <Fab
        color="secondary"
        onClick={handleRemoveFortune}
        disabled={fortuneCount <= minNumberOfFortunes}
        size="small"
      >
        <RemoveIcon />
      </Fab>

      <Typography
        variant="h1"
        sx={{
          cursor: "pointer",
        }}
        onClick={handleOpenDialog}
      >
        🐼
      </Typography>

      <Fab
        color="primary"
        onClick={handleAddFortune}
        disabled={fortuneCount >= maxNumberOfFortunes}
        size="small"
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default TitleBar;
