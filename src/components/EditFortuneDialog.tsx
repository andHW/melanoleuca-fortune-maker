import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { type Fortune } from "../types/fortuneTypes";

interface EditFortuneDialogProps {
  open: boolean;
  onClose: () => void;
  fortune: Fortune;
  onSave: (updatedFortune: Fortune) => void;
}

const EditFortuneDialog = ({
  open,
  onClose,
  fortune,
  onSave,
}: EditFortuneDialogProps) => {
  const [localBrandName, setLocalBrandName] = useState(fortune.localBrandName);
  const [localFortuneText, setLocalFortuneText] = useState(
    fortune.localFortuneText
  );
  const [applyLocalBrandName, setApplyLocalBrandName] = useState(
    fortune.applyLocalBrandName
  );
  const [applyLocalFortuneText, setApplyLocalFortuneText] = useState(
    fortune.applyLocalFortuneText
  );

  const handleSave = () => {
    onSave({
      localBrandName,
      localFortuneText,
      applyLocalBrandName,
      applyLocalFortuneText,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Fortune</DialogTitle>
      <DialogContent>
        <TextField
          label="Brand Name"
          fullWidth
          margin="dense"
          value={localBrandName}
          onChange={(e) => setLocalBrandName(e.target.value)}
        />
        <TextField
          label="Fortune Text"
          fullWidth
          margin="dense"
          value={localFortuneText}
          onChange={(e) => setLocalFortuneText(e.target.value)}
        />
        <FormControlLabel
          control={
            <Switch
              checked={applyLocalBrandName}
              onChange={(e) => setApplyLocalBrandName(e.target.checked)}
            />
          }
          label="Apply Local Brand Name"
        />
        <FormControlLabel
          control={
            <Switch
              checked={applyLocalFortuneText}
              onChange={(e) => setApplyLocalFortuneText(e.target.checked)}
            />
          }
          label="Apply Local Fortune Text"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFortuneDialog;
