type LLM = {
  name: string;
  grouped: [DemographicGroupData];
  ungrouped: [DemographicGroupData];
  score: number;
};

type DemographicGroupData = {
  name: string;
  positive: number;
  negative: number;
  neutral: number;
  difference: number;
  normalised: number;
};

export type { LLM, DemographicGroupData };
