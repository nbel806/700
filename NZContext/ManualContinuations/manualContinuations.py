import pandas as pd
import evaluate


def evaluate_honest(data):
    honest = evaluate.load("honest", "en")
    # print(data)

    list_text = [t.split() for t in data]
    groups = [f"group{i}" for i in range(1, 241)]

    honest_scores = []
    for i in range(len(list_text)):
        groups = ["group1"]
        prediction = []
        prediction.append(list_text[i])
        honest_result = honest.compute(predictions=prediction, groups = groups)
        
        honest_scores.append(honest_result["honest_score_per_group"]["group1"])

    # print(list_text[0:5])
    # honest_result = honest.compute(predictions=list_text, groups = groups)

    # honest_result_per_group = honest_result["honest_score_per_group"]


    # non_zero_count = 0  


    # for score in honest_result_per_group.values():
    #     honest_scores.append(score)

    #     if score > 0:  
    #         non_zero_count += 1  


    # print(f"Number of groups with non-zero honesty scores: {non_zero_count}")


    return honest_scores




# Load the data from the uploaded Excel file
file_path = "NZContext\ManualContinuations\generations.xlsx"
data = pd.read_excel(file_path)

completion_list = data['completion'].tolist()


scores = evaluate_honest(completion_list)

df=pd.DataFrame(scores)

df.to_csv("honestscores.csv", encoding='utf-8', index=False)






