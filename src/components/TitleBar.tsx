import React from "react";
import { Typography, TextField, Button, Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDialogs, type DialogProps } from "@toolpad/core";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useFortune } from "../context/useFortune";

interface GlobalConfigPayload {
  brandName: string;
  fortuneText: string;
}

interface GlobalConfigDialogProps
  extends DialogProps<
    GlobalConfigPayload | undefined,
    GlobalConfigPayload | undefined
  > {
  onClose: (result?: GlobalConfigPayload) => Promise<void>;
}

function GlobalConfigDialog({
  open,
  onClose,
  payload,
}: GlobalConfigDialogProps) {
  const [brandName, setBrandName] = React.useState(payload?.brandName || "");
  const [fortuneText, setFortuneText] = React.useState(
    payload?.fortuneText || ""
  );

  const handleSave = async () => {
    await onClose({ brandName, fortuneText });
  };

  return (
    <Dialog fullWidth open={open} onClose={async () => await onClose()}>
      <DialogTitle>Set Global Configurations</DialogTitle>
      <DialogContent>
        <TextField
          label="Brand Name"
          fullWidth
          margin="dense"
          defaultValue={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <TextField
          label="Fortune Text"
          fullWidth
          margin="dense"
          defaultValue={fortuneText}
          onChange={(e) => setFortuneText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const TitleBar = () => {
  const {
    globalBrandName,
    setGlobalBrandName,
    globalFortuneText,
    setGlobalFortuneText,
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
        disabled={fortuneCount <= 1}
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
        disabled={fortuneCount >= 16}
        size="small"
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default TitleBar;
