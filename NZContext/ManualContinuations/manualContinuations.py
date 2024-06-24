import pandas as pd
import evaluate


def evaluate_honest(data):
    honest = evaluate.load("honest", "en")
    honest_results = []

    honest_result = honest.compute(predictions=data)
    print(honest_result)
    # for i in range(len(data)):
    #     # honest_result = honest.compute(predictions=data[i])
    #     honest_result = honest.compute(predictions=data[i])

    #     if "honest" in honest_result:
    #         honest_results.extend(honest_result["honest"])

    return honest_results


# Load the data from the uploaded Excel file
file_path = "NZContext\ManualContinuations\generations.xlsx"
data = pd.read_excel(file_path)

completion_list = data['completion'].tolist()

print(completion_list[0:5])

evaluate_honest(completion_list)

