import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip as MuiTooltip,
  Typography,
} from "@mui/material";
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
import { ChartOptions } from "chart.js";

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
  selectedData: string;
  namesAreChanged: boolean;
  numOfGenerations: { [key: string]: number };
  setNumOfGenerations: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
}

export default function LLMGraph({
  llm1,
  llm2,
  llmGroups,
  selectedData,
  namesAreChanged,
  setNumOfGenerations,
  numOfGenerations,
}: LLMGraphProps) {
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
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const fetchData = async (
    llm: string,
    setData: React.Dispatch<React.SetStateAction<DemographicGroupData[]>>
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/llm/group/data/${llm}/true`,
        {
          params: {
            selectedData,
          },
        }
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
  }, [llm1, namesAreChanged]);

  useEffect(() => {
    if (llm2) {
      fetchData(llm2, setLlm2Data);
    }
  }, [llm2, namesAreChanged]);

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
        .map((item) => item.normalised);
      const filteredDifferences2 = llm2Data
        .filter((item) => selectedGroups.includes(item.name))
        .map((item) => item.normalised);

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
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      ...(llm2 && llm2 !== ""
        ? [
            {
              label: llm2,
              data: demographicGroupData2,
              backgroundColor: "rgba(54, 162, 235, 0.7)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ]
        : []),
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Arial",
            size: 18,
            weight: "bold",
          },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: `Demographic group bias between LLMs (n= ${numOfGenerations[selectedData]})`,
        font: {
          family: "Arial",
          size: 35,
          weight: "bold",
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
          text: "LLM Generation bias score",
          font: {
            family: "Arial",
            size: 25,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            family: "Arial",
            size: 20,
          },
          callback: (value: number | string) => {
            return typeof value === "number"
              ? value > 0
                ? `+${value}`
                : value
              : value;
          },
        },
        grid: {
          // customize the zero line
          lineWidth: (ctx) => {
            return ctx.tick.value === 0 ? 1 : 1;
          },
          color: (ctx) => {
            return ctx.tick.value === 0
              ? "rgba(0, 0, 0, 1)"
              : "rgba(0, 0, 0, 0.1)";
          },
        },
      },
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          font: {
            family: "Arial",
            size: 20,
          },
          callback: function (val, index, ticks) {
            const label = this.getLabelForValue(index) as string;
            return label.length > 10 ? label.split(" ") : label;
          },
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Demographic Groups",
          font: {
            family: "Arial",
            size: 25,
            weight: "bold",
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.default",
        borderRadius: 4,
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Bar data={data} options={options} style={{ padding: 20 }} />
      )}
      <MuiTooltip title="Information about the chart">
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
          <InfoIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </MuiTooltip>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle style={{ paddingTop: 8, textAlign: "center" }}>
          Graph Information
        </DialogTitle>
        <DialogContent style={{ padding: 16 }}>
          <Typography variant="body1" color="primary">
            We produce 1000 generations for each demographic group using the LLM
            and use our metric to find how many generations are positive and how
            many are negative. Then find the difference by doing number of
            positive generations - number of negative generations. For more
            information see the Bias Detection Process section in the About
            Page.
          </Typography>
        </DialogContent>
        <DialogActions style={{ padding: 8 }}>
          <Button onClick={handleClose} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
