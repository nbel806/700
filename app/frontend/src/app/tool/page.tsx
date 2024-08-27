"use client";

import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import LLMCompare from "@/components/tool/llmCompare";
import LLMGroups from "@/components/tool/llmGroups";
import BiasScore from "@/components/tool/biasScore";
// import GenerateArea from "@/components/tool/generateArea";
import axios from "axios";
import LLMGraph from "@/components/tool/llmGraph";

export interface Group {
  name: string;
  checked: boolean;
}

export default function Tool() {
  const [llm1, setLlm1] = useState<string>("gpt2");
  const [llm2, setLlm2] = useState<string>("bert");
  const [llm1Groups, setLlm1Groups] = useState<Group[]>([]);
  const [llm2Groups, setLlm2Groups] = useState<Group[]>([]);
  const [llmGroupsFinal, setLlmGroupsFinal] = useState<Group[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const fetchGroups = async (
    llm: string,
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/llm/group/${llm}/true`
      );
      setGroups(
        response.data.map((group: any) => ({ name: group, checked: false }))
      );
    } catch (error) {
      console.error(`Error fetching groups for ${llm}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (llm1) {
      fetchGroups(llm1, setLlm1Groups);
    }
  }, [llm1]);

  useEffect(() => {
    if (llm2) {
      fetchGroups(llm2, setLlm2Groups);
    }
  }, [llm2]);

  useEffect(() => {
    if (llm1Groups.length > 0 && llm2Groups.length > 0) {
      const intersection = llm1Groups.filter((group1) =>
        llm2Groups.some((group2) => group1.name === group2.name)
      );
      setLlmGroupsFinal(intersection);
    } else if (llm1Groups.length > 0) {
      setLlmGroupsFinal(llm1Groups);
    } else {
      setLlmGroupsFinal([]);
    }
  }, [llm1Groups, llm2Groups]);

  const handleCheckChange = (groupName: string, checked: boolean) => {
    setLlmGroupsFinal((prevGroups) =>
      prevGroups.map((group) =>
        group.name === groupName ? { ...group, checked } : group
      )
    );
  };

  return (
    <Box style={{ height: "100%" }}>
      <Grid container style={{ height: "100%" }}>
        {/* Left Side - Split into Top and Bottom */}
        <Grid
          item
          xs={9}
          container
          direction="column"
          style={{ height: "100%" }}
        >
          <Box flex="3" style={{ backgroundColor: "#f0f0f0", padding: "3vh" }}>
            <LLMGraph llm1={llm1} llm2={llm2} llmGroups={llmGroupsFinal} />
          </Box>
          <Box flex="1" style={{ backgroundColor: "#e0e0e0", padding: "3vh" }}>
            <BiasScore llm1={llm1} llm2={llm2} />
          </Box>
        </Grid>

        {/* Right Side - Split into Top, Middle, and Bottom */}
        <Grid
          item
          xs={3}
          container
          direction="column"
          style={{ height: "100%", overflow: "hidden" }}
        >
          <Box
            style={{
              height: "100%",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              flex="1"
              style={{ backgroundColor: "#d0d0d0", padding: "3vh" }}
            >
              <LLMCompare
                llm1={llm1}
                setLlm1={setLlm1}
                llm2={llm2}
                setLlm2={setLlm2}
              />
            </Box>
            <Box
              flex="3"
              style={{ backgroundColor: "#c0c0c0", padding: "3vh" }}
            >
              <LLMGroups
                llmGroupsFinal={llmGroupsFinal}
                onCheckChange={handleCheckChange}
              />
            </Box>
            {/* <Box
              flex="1"
              style={{ backgroundColor: "#b0b0b0", padding: "3vh" }}
            >
              <GenerateArea />
            </Box> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
