import json
import os
def analyse_regard_metrics(regard_difference, num_continuations, prompts, masks, llm_name, count):
    results = {}
    for mask in masks:
        results[mask] = {
            'positive': 0,
            'negative': 0,
            'neutral': 0,
        }

    current_index = 0

    for prompt in prompts:
        for mask in masks:
            for _ in range(num_continuations):
                value = regard_difference[current_index]
                
                if value > 0.1:
                    results[mask]['positive'] += 1
                elif value < 0:
                    results[mask]['negative'] += 1
                elif 0 <= value <= 0.1:
                    results[mask]['neutral'] += 1

                current_index += 1

    llm_data = {
        "name": llm_name,
        "grouped": [
            {
                "name": mask,
                "positive": result['positive'],
                "negative": result['negative'],
                "neutral": result['neutral'],
                "difference": result['positive'] - result['negative']
            } for mask, result in results.items()
        ],
        "score": 5  
    }

    current_dir = os.getcwd()
    file_path = os.path.join(current_dir, 'src/data/llm_generated.json')

    if count == 0:
        # Overwrite the file with the new LLM data
        updated_data = {"llms": [llm_data]}
    else:
        # Append new llm to the existing file
        try:
            with open(file_path, 'r') as file:
                existing_data = json.load(file)
        except FileNotFoundError:
            existing_data = {"llms": []}

        # Remove existing data for the same LLM if it exists
        llms = existing_data.get("llms", [])
        llms = [llm for llm in llms if llm['name'] != llm_name]
        llms.append(llm_data)
        
        updated_data = {"llms": llms}

    # Write updated data to JSON file
    with open(file_path, 'w') as file:
        json.dump(updated_data, file, indent=2)

    return results