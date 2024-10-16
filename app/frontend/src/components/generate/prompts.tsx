"use client";
import React, { ChangeEvent, KeyboardEvent } from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Checkbox,
  IconButton,
  TextField,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddBoxOutlined";
import InfoIcon from "@mui/icons-material/Info";

interface PromptsProps {
  prompts: { description: string; checked: boolean }[];
  setPrompts: React.Dispatch<
    React.SetStateAction<{ description: string; checked: boolean }[]>
  >;
}

export default function Prompts({ prompts, setPrompts }: PromptsProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [showTextbox, setShowTextbox] = useState(false);
  const [newPrompt, setNewPrompt] = useState("");

  const handleAddClick = () => setShowTextbox(true);

  const handleTextboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPrompt(event.target.value);
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      addPrompt();
    }
  };

  const handleAddButtonClick = () => addPrompt();

  const addPrompt = () => {
    if (newPrompt.trim() !== "") {
      setPrompts((prevPrompts) => [
        ...prevPrompts,
        { description: newPrompt.trim(), checked: true },
      ]);
      setNewPrompt("");
      setShowTextbox(false);
    } else {
      setShowTextbox(false);
    }
  };

  const handleCheckboxChange = (index: number) => {
    setPrompts((prevPrompts) =>
      prevPrompts.map((prompt, i) =>
        i === index ? { ...prompt, checked: !prompt.checked } : prompt
      )
    );
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "visible",
        alignItems: "center",
        width: "35%",
        height: "100%",
        position: "relative",
      }}
      variant="outlined"
      style={{ padding: 16 }}
    >
      <Typography variant="h6" align="center">
        Prompts
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
        style={{ padding: 16 }}
      >
        {prompts.map((prompt, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid black",
            }}
            style={{ padding: 8, borderRadius: 4 }}
          >
            <Typography variant="body1">{prompt.description}</Typography>
            <Checkbox
              style={{ marginLeft: 8 }}
              checked={prompt.checked}
              onChange={() => handleCheckboxChange(index)}
            />
          </Box>
        ))}

        {showTextbox && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
              marginTop: 2,
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              value={newPrompt}
              onChange={handleTextboxChange}
              onKeyDown={handleEnterPress}
              placeholder="Enter new prompt"
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddButtonClick}
            >
              Enter
            </Button>
          </Box>
        )}
      </Box>

      {!showTextbox && (
        <IconButton
          color="primary"
          aria-label="add prompt"
          onClick={handleAddClick}
        >
          <AddIcon fontSize="large" />
          <Typography variant="body1">Add Prompt</Typography>
        </IconButton>
      )}

      <Tooltip title="Information about the prompts">
        <IconButton
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "primary",
          }}
          aria-label="info"
          onClick={handleClickOpen}
        >
          <InfoIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Tooltip>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle style={{ paddingTop: 8, textAlign: "center" }}>
          Prompts Information
        </DialogTitle>
        <DialogContent style={{ padding: 16 }}>
          <Typography variant="body1" color="primary">
            Prompts are combined with the demographic groups to generate
            continuations.
          </Typography>
        </DialogContent>
        <DialogActions style={{ padding: 8 }}>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
