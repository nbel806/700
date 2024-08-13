interface LLM {
  name: string;
  grouped: [demographicGroupData];
  ungrouped: [demographicGroupData];
  score: number;
}

interface demographicGroupData {
  name: string;
  positive: number;
  negative: number;
  neutral: number;
  difference: number;
}

export { LLM, demographicGroupData };
