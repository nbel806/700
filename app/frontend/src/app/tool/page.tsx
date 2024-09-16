"use client";

import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import LLMCompare from "@/components/tool/llmCompare";
import LLMGroups from "@/components/tool/llmGroups";
import BiasScore from "@/components/tool/biasScore";
import axios from "axios";
import LLMGraph from "@/components/tool/llmGraph";
import SelectData from "@/components/tool/selectData";
import { useSearchParams } from "next/navigation";

export interface Group {
  name: string;
  checked: boolean;
}

export default function Tool() {
  const searchParams = useSearchParams();
  const [llm1, setLlm1] = useState<string>("");
  const [llm2, setLlm2] = useState<string>("");
  const [llm1Groups, setLlm1Groups] = useState<Group[]>([]);
  const [llm2Groups, setLlm2Groups] = useState<Group[]>([]);
  const [llmGroupsIntersection, setLlmGroupsIntersection] = useState<Group[]>(
    []
  );
  const [selectedData, setSelectedData] = useState<string>(
    () => searchParams.get("selectedData") || "default_data"
  );
  const [namesAreChanged, setNamesAreChanged] = useState<boolean>(false);
  const [numOfGenerations, setNumOfGenerations] = useState<{
    [key: string]: number;
  }>({});

  const fetchGroups = async (
    llm: string,
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/llm/group/${llm}/true`,
        {
          params: {
            selectedData,
          },
        }
      );
      setGroups(
        response.data.map((group: any) => ({ name: group, checked: true }))
      );
    } catch (error) {
      console.error(`Error fetching groups for ${llm}:`, error);
    }
  };

  useEffect(() => {
    if (llm1) {
      fetchGroups(llm1, setLlm1Groups);
    }
  }, [llm1, namesAreChanged]);

  useEffect(() => {
    if (llm2) {
      fetchGroups(llm2, setLlm2Groups);
    } else {
      setLlm2Groups([]);
    }
  }, [llm2, namesAreChanged]);

  useEffect(() => {
    if (llm1Groups.length > 0 && llm2Groups.length > 0) {
      const intersection = llm1Groups.filter((group1) =>
        llm2Groups.some((group2) => group1.name === group2.name)
      );
      setLlmGroupsIntersection(intersection);
    } else if (llm1Groups.length > 0) {
      setLlmGroupsIntersection(llm1Groups);
    } else {
      setLlmGroupsIntersection([]);
    }
  }, [llm1Groups, llm2Groups]);

  const handleCheckChange = (groupName: string, checked: boolean) => {
    setLlmGroupsIntersection((prevGroups) =>
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
          style={{
            height: "100%",
            display: "flex",
          }}
        >
          <Box
            flex="3"
            style={{
              padding: 16,
              overflow: "auto",
            }}
            sx={{ backgroundColor: "background.default" }}
          >
            <LLMGraph
              llm1={llm1}
              llm2={llm2}
              llmGroups={llmGroupsIntersection}
              selectedData={selectedData}
              namesAreChanged={namesAreChanged}
              numOfGenerations={numOfGenerations}
              setNumOfGenerations={setNumOfGenerations}
            />
          </Box>
          <Box
            flex="1"
            style={{
              padding: 16,
              overflow: "auto",
            }}
            sx={{
              backgroundColor: "background.default",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BiasScore
              llm1={llm1}
              llm2={llm2}
              selectedData={selectedData}
              namesAreChanged={namesAreChanged}
            />
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
              style={{ padding: 16 }}
              sx={{ backgroundColor: "background.default" }}
            >
              <LLMCompare
                llm1={llm1}
                setLlm1={setLlm1}
                llm2={llm2}
                setLlm2={setLlm2}
                selectedData={selectedData}
                setNamesAreChanged={setNamesAreChanged}
                namesAreChanged={namesAreChanged}
              />
            </Box>
            <Box
              flex="3"
              style={{ padding: 16 }}
              sx={{ backgroundColor: "background.default" }}
            >
              <LLMGroups
                llmGroupsFinal={llmGroupsIntersection}
                onCheckChange={handleCheckChange}
              />
            </Box>
            <Box
              flex="1"
              sx={{
                backgroundColor: "background.default",
              }}
              style={{ padding: 16 }}
            >
              <SelectData
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                numOfGenerations={numOfGenerations}
                setNumOfGenerations={setNumOfGenerations}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
