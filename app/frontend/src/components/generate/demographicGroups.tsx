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
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddBoxOutlined";
import InfoIcon from "@mui/icons-material/Info";

interface DemographicGroupsProps {
  groups: { name: string; checked: boolean }[];
  setGroups: React.Dispatch<
    React.SetStateAction<{ name: string; checked: boolean }[]>
  >;
}

export default function DemographicGroups({
  groups,
  setGroups,
}: DemographicGroupsProps) {
  const [showTextbox, setShowTextbox] = useState(false);
  const [newGroup, setNewGroup] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

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
      setGroups((prevGroups) => [
        ...prevGroups,
        { name: newGroup.trim(), checked: true },
      ]);
      setNewGroup("");
      setShowTextbox(false);
    } else {
      setShowTextbox(false);
    }
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCheckboxChange = (name: string) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.name === name ? { ...group, checked: !group.checked } : group
      )
    );
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
        position: "relative",
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
          gap: 3,
        }}
      >
        {groups.map((group) => (
          <FormControlLabel
            key={group.name}
            control={
              <Checkbox
                checked={group.checked}
                onChange={() => handleCheckboxChange(group.name)}
              />
            }
            label={group.name}
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

      <Tooltip title="Information about the demographic groups">
        <IconButton
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            color: "primary",
          }}
          aria-label="info"
          onClick={handleClickOpen}
        >
          <InfoIcon sx={{ fontSize: 36 }} />
        </IconButton>
      </Tooltip>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle style={{ paddingTop: 8, textAlign: "center" }}>
          Demographic Groups Information
        </DialogTitle>
        <DialogContent style={{ padding: 16 }}>
          <Typography variant="body1" color="primary">
            . For more information...
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
