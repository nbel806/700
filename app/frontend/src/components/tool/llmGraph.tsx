import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Box, IconButton, Tooltip as MuiTooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Group } from "../../app/tool/page";
import axios from "axios";
import { DemographicGroupData } from "@/types/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LLMGraphProps {
  llm1: string;
  llm2: string;
  llmGroups: Group[];
}
interface Data {
  name: string;
  difference: number;
}

export default function LLMGraph({ llm1, llm2, llmGroups }: LLMGraphProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [llm1Data, setLlm1Data] = useState<DemographicGroupData[]>([]);
  const [llm2Data, setLlm2Data] = useState<DemographicGroupData[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [demographicGroupData1, setDemographicGroupData1] = useState<number[]>(
    []
  );
  const [demographicGroupData2, setDemographicGroupData2] = useState<number[]>(
    []
  );
  const fetchData = async (
    llm: string,
    setData: React.Dispatch<React.SetStateAction<DemographicGroupData[]>>
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/llm/group/data/${llm}/true`
      );
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching groups for ${llm}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (llm1) {
      fetchData(llm1, setLlm1Data);
    }
  }, [llm1]);

  useEffect(() => {
    if (llm2) {
      fetchData(llm2, setLlm2Data);
    }
  }, [llm2]);

  useEffect(() => {
    let groups: string[] = [];
    llmGroups.map((group) => {
      if (group.checked) {
        groups.push(group.name);
      }
    });
    setSelectedGroups(groups);
  }, [llmGroups]);

  useEffect(() => {
    if (selectedGroups.length > 0) {
      const filteredDifferences1 = llm1Data
        .filter((item) => selectedGroups.includes(item.name))
        .map((item) => item.difference);
      const filteredDifferences2 = llm2Data
        .filter((item) => selectedGroups.includes(item.name))
        .map((item) => item.difference);

      setDemographicGroupData1(filteredDifferences1);
      setDemographicGroupData2(filteredDifferences2);
    }
  }, [selectedGroups, llm1Data, llm2Data]);
  const data = {
    labels: selectedGroups,
    datasets: [
      {
        label: llm1,
        data: demographicGroupData1,
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Different color
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: llm2,
        data: demographicGroupData2,
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Different color
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            family: "Arial" as const,
            size: 18,
            style: "normal" as const,
            weight: "bold" as const,
          },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "Comparison of continuation difference between LLMs",
        font: {
          family: "Arial" as const,
          size: 30,
          style: "normal" as const,
          weight: "bold" as const,
        },
        padding: {
          top: 20,
          bottom: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Difference (Number of Positive Continuation - Negative Continuation)",
          font: {
            family: "Arial" as const,
            size: 16,
            style: "normal" as const,
            weight: "bold" as const,
          },
        },
        ticks: {
          font: {
            family: "Arial" as const,
            size: 16,
            style: "normal" as const,
          },
        },
      },
      x: {
        ticks: {
          font: {
            family: "Arial" as const,
            size: 20,
            style: "normal" as const,
          },
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Demographic Groups",
          font: {
            family: "Arial" as const,
            size: 24,
            style: "normal" as const,
            weight: "bold" as const,
          },
        },
      },
    },
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        bgcolor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? <p>Loading...</p> : <Bar data={data} options={options} />}
      <MuiTooltip title="Information about the chart">
        <IconButton
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "gray",
          }}
          aria-label="info"
        >
          <InfoIcon />
        </IconButton>
      </MuiTooltip>
    </Box>
  );
}
