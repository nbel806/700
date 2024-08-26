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
        borderRadius: 2,
        border: "1px solid #e2e2e2",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
      style={{
        padding: "30px",
      }}
    >
      <Typography
        variant="h4"
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
                <Typography
                  variant="body1"
                  color="primary"
                  sx={{ fontSize: "1.5rem" }}
                >
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
