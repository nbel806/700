"use client";

import React from "react";
import { Box, Typography, List, ListItem, Checkbox } from "@mui/material";

interface LLMGroupsProps {
  llmGroupsFinal: Group[];
  onCheckChange: (groupName: string, checked: boolean) => void;
}

interface Group {
  name: string;
  checked: boolean;
}

export default function LLMGroups({
  llmGroupsFinal,
  onCheckChange,
}: LLMGroupsProps) {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      style={{
        padding: 16,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        color="primary"
        sx={{ fontWeight: "bold", mt: "2px" }}
        style={{ marginBottom: "16px" }}
      >
        Demographic Groups
      </Typography>

      <List
        sx={{
          width: "100%",
        }}
      >
        {llmGroupsFinal && llmGroupsFinal.length > 0 ? (
          llmGroupsFinal.map((group) => (
            <ListItem
              key={group.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                marginBottom: "8px",
                borderRadius: 10,
                backgroundColor: "#ffffff",
              }}
            >
              <Box>
                <Typography variant="body1" color="black">
                  {group.name}
                </Typography>
              </Box>

              <Checkbox
                checked={group.checked}
                onChange={(e) => onCheckChange(group.name, e.target.checked)}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" color="primary">
            Loading Groups ...
          </Typography>
        )}
      </List>
    </Box>
  );
}
