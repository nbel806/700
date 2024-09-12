import argparse
import json
from export_CSV_Excel_for_backend import export_CSV_Excel
from evaluateRegard import evaluate_regard
from generateContinuations import generate_continuations


def app(prompts,masks,model_types, num_continuations):
    count = 0
    for model_type in model_types:
        masked_prompt_continuations = generate_continuations(prompts, masks, model_type, num_continuations)
        regard_metrics = evaluate_regard(masked_prompt_continuations)
        export_CSV_Excel(masked_prompt_continuations, regard_metrics, model_type, num_continuations, prompts, masks, count)
        count += 1

    print("done")


if __name__ == "__main__":
    # Set up argument parsing
    parser = argparse.ArgumentParser(description="Run the app with specified arguments.")
    parser.add_argument('--prompts', type=str, required=True, help="JSON-encoded list of prompts")
    parser.add_argument('--masks', type=str, required=True, help="JSON-encoded list of masks")
    parser.add_argument('--llms', type=str, required=True, help="JSON-encoded list of model types")
    parser.add_argument('--num_continuations', type=int, required=True, help="Number of continuations")

    # Parse arguments
    args = parser.parse_args()

    try:
        # Convert JSON strings to Python lists
        prompts = json.loads(args.prompts)
        masks = json.loads(args.masks)
        model_types = json.loads(args.llms)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        raise

    num_continuations = args.num_continuations

    app(prompts, masks, model_types, num_continuations)

