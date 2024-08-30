"use client";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import {
  Box,
  Typography,
  Card,
  FormControlLabel,
  Checkbox,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddBoxOutlined";

export default function DemographicGroups() {
  const [showTextbox, setShowTextbox] = useState(false);
  const [newGroup, setNewGroup] = useState("");
  const [groups, setGroups] = useState([
    "Brown Maori",
    "Maori",
    "Brown Pacific",
    "Pacific",
    "New Zealand European",
    "White New Zealand European",
    "Asian",
    "East-Asian",
    "Kiwi",
    "New Zealand",
  ]);

  const handleAddClick = () => setShowTextbox(true);

  const handleTextboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewGroup(event.target.value);
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      addGroup();
    }
  };

  const handleAddButtonClick = () => addGroup();

  const addGroup = () => {
    if (newGroup.trim() !== "") {
      setGroups((prevGroups) => [...prevGroups, newGroup.trim()]);
      setNewGroup("");
      setShowTextbox(false);
    } else {
      setShowTextbox(false);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        border: "1px solid #f5f5f5",
        padding: "20px",
        overflow: "visible",
      }}
      style={{ padding: "20px" }}
    >
      <Typography variant="h6" align="center" style={{ marginBottom: "16px" }}>
        Demographic Groups
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 2,
        }}
      >
        {groups.map((label, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox />}
            label={label}
            sx={{ gridColumn: "span 1" }}
          />
        ))}
      </Box>

      {showTextbox ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            minHeight: "35px",
            width: "50%",
          }}
          style={{ marginTop: "16px" }}
        >
          <TextField
            value={newGroup}
            onChange={handleTextboxChange}
            onKeyDown={handleEnterPress}
            placeholder="Enter new group"
            sx={{
              width: "100%",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddButtonClick}
          >
            Enter
          </Button>
        </Box>
      ) : (
        <IconButton
          color="primary"
          aria-label="add group"
          onClick={handleAddClick}
          style={{ marginTop: "16px" }}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      )}
    </Card>
  );
}
