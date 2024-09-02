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
        overflow: "visible",
        width: "65%",
        height: "100%",
        position: "relative",
      }}
      variant="outlined"
      style={{ padding: 16 }}
    >
      <Typography variant="h6" style={{ marginBottom: 8 }}>
        Demographic Groups
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 1,
        }}
      >
        {groups.map((group) => (
          <FormControlLabel
            key={group.name}
            control={
              <Checkbox
                style={{ padding: 8 }}
                checked={group.checked}
                onChange={() => handleCheckboxChange(group.name)}
              />
            }
            label={group.name}
            sx={{ gridColumn: "span 1" }}
          />
        ))}
      </Box>
      <Tooltip title="Information about the demographic groups">
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
            value={newGroup}
            onChange={handleTextboxChange}
            onKeyDown={handleEnterPress}
            placeholder="Enter new prompt"
            sx={{ flex: 1 }}
            style={{ padding: 16 }}
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

      {!showTextbox && (
        <IconButton
          color="primary"
          aria-label="add prompt"
          onClick={handleAddClick}
        >
          <AddIcon fontSize="large" />
          <Typography variant="body1">Add Demographic Group</Typography>
        </IconButton>
      )}

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
