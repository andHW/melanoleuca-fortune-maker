import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { type DialogProps } from "@toolpad/core";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

interface GlobalConfigInputPayload {
  brandName: string;
  fortuneText: string;
  maxNumberOfFortunes: number;
}

interface GlobalConfigOutputPayload {
  brandName: string;
  fortuneText: string;
}

interface GlobalConfigDialogProps
  extends DialogProps<
    GlobalConfigInputPayload | undefined,
    GlobalConfigOutputPayload | undefined
  > {
  onClose: (result?: GlobalConfigOutputPayload) => Promise<void>;
}

function GlobalConfigDialog({
  open,
  onClose,
  payload,
}: GlobalConfigDialogProps) {
  const [brandName, setBrandName] = useState(payload?.brandName || "");
  const [fortuneText, setFortuneText] = useState(payload?.fortuneText || "");

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
        <Typography>{`The total number of fortunes is limited to ${payload?.maxNumberOfFortunes}.`}</Typography>
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

export default GlobalConfigDialog;
