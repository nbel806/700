var data = require("../data/llm.json");

/**
 * Retrieves a list of all LLM names from the data.
 *
 * @return {string[]} An array of LLM names
 */
const getLLMNames = () => {
  var llmNames = [];
  data.llms.forEach((llm) => {
    llm.names.forEach((name) => {
      llmNames.push(name);
    });
  });

  return llmNames;
};
/**
 * Retrieves a list of demographic groups for a given LLM.
 *
 * @param {string} llm - The name of the LLM to retrieve demographic groups for
 * @return {object[]} An array of objects containing demographic group names
 */
const getDemographicGroups = (llm) => {
  var demographicGroups = [];
  data.llms[llm].grouped.forEach((group) => {
    demographicGroups.push({
      name: group.name,
    });
  });

  return demographicGroups;
};

/**
 * Retrieves the grouped data for a given LLM.
 *
 * @param {string} llm - The name of the LLM to retrieve grouped data for
 * @return {object[]} An array of objects containing grouped data
 */
const getLLMDataGrouped = (llm) => {
  return data.llms[llm].grouped;
};

/**
 * Retrieves the ungrouped data for a given LLM.
 *
 * @param {string} llm - The name of the LLM to retrieve ungrouped data for
 * @return {object[]} An array of objects containing ungrouped data
 */
const getLLMDataUngrouped = (llm) => {
  return data.llms[llm].ungrouped;
};

/**
 * Retrieves the score of a given LLM.
 *
 * @param {string} llm - The name of the LLM to retrieve the score for
 * @return {number} The score of the LLM
 */
const getLLMScore = (llm) => {
  return data.llms[llm].score;
};

export {
  getLLMNames,
  getDemographicGroups,
  getLLMDataGrouped,
  getLLMDataUngrouped,
  getLLMScore,
};
