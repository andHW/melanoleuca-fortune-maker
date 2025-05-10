import { useState } from "react";
import { Box } from "@mui/material";
import { useFortune } from "../context/useFortune";
import FortunePaper from "./FortunePaper";
import EditFortuneDialog from "./EditFortuneDialog";

const FortunePapers = () => {
  const { fortunes, setFortunes } = useFortune();
  const [selectedFortune, setSelectedFortune] = useState<number | null>(null);

  const handleEditFortune = (index: number) => {
    setSelectedFortune(index);
  };

  const handleSaveFortune = (
    index: number,
    updatedFortune: {
      localBrandName: string;
      localFortuneText: string;
      applyLocalBrandName: boolean;
      applyLocalFortuneText: boolean;
    }
  ) => {
    const updatedFortunes = [...fortunes];
    updatedFortunes[index] = updatedFortune;
    setFortunes(updatedFortunes);
  };

  const getGridTemplateColumns = () => {
    const columnCount = Math.ceil(Math.sqrt(fortunes.length)); // Calculate the square root and round up
    return `repeat(${columnCount}, 1fr)`; // Create a grid with the calculated number of columns
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: getGridTemplateColumns(),
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {fortunes.map((fortune, index) => (
        <FortunePaper
          key={index}
          fortune={fortune}
          onClick={() => handleEditFortune(index)}
        />
      ))}

      {selectedFortune !== null && (
        <EditFortuneDialog
          open={selectedFortune !== null}
          onClose={() => setSelectedFortune(null)}
          fortune={fortunes[selectedFortune]}
          onSave={(updatedFortune) =>
            handleSaveFortune(selectedFortune, updatedFortune)
          }
        />
      )}
    </Box>
  );
};

export default FortunePapers;
