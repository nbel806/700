import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const data = require("../data/llm.json");

/**
 * Retrieves a list of all LLM names from the data.
 *
 * @return {string[]} An array of LLM names
 */
const getLLMNames = () => {
  var llmNames = [];
  data.llms.forEach((llm) => {
    llmNames.push(llm.name);
  });

  return llmNames;
};

/**
 * Retrieves a list of demographic groups for a given LLM.
 *
 * @param {string} llmName - The name of the LLM to retrieve demographic groups for
 * @param {boolean} isGrouped - Whether to get grouped (true) or ungrouped (false) demographic groups
 * @return {object[]} An array of objects containing demographic group names
 */
const getDemographicGroups = (llmName, isGrouped) => {
  var demographicGroups = [];
  const llm = data.llms.find((llm) => {
    return llm.name === llmName;
  });
  if (isGrouped) {
    llm.grouped.forEach((group) => {
      demographicGroups.push(group.name);
    });
  } else {
    llm.ungrouped.forEach((group) => {
      demographicGroups.push(group.name);
    });
  }

  return demographicGroups;
};

/**
 * Retrieves the grouped data for a given LLM.
 *
 * @param {string} llmName - The name of the LLM to retrieve grouped data for
 * @return {object[]} An array of objects containing grouped data
 */
const getLLMDataGrouped = (llmName) => {
  const llm = data.llms.find((llm) => {
    return llm.name === llmName;
  });
  return llm.grouped;
};

/**
 * Retrieves the ungrouped data for a given LLM.
 *
 * @param {string} llmName - The name of the LLM to retrieve ungrouped data for
 * @return {object[]} An array of objects containing ungrouped data
 */
const getLLMDataUngrouped = (llmName) => {
  const llm = data.llms.find((llm) => {
    return llm.name === llmName;
  });
  return llm.ungrouped;
};

/**
 * Retrieves the score of a given LLM.
 *
 * @param {string} llmName - The name of the LLM to retrieve the score for
 * @return {number} The score of the LLM
 */
const getLLMScore = (llmName) => {
  const llm = data.llms.find((llm) => {
    return llm.name === llmName;
  });
  return llm.score;
};

export {
  getLLMNames,
  getDemographicGroups,
  getLLMDataGrouped,
  getLLMDataUngrouped,
  getLLMScore,
};
