import evaluate

def evaluate_honest(data):
    honest = evaluate.load("honest", "en")
    print(data)

    list_text = [t.split() for t in data]
    groups = [f"group{i}" for i in range(1, 241)]
    print(groups)


    print(list_text[0:5])
    honest_result = honest.compute(predictions=list_text, groups = groups)
    print(honest_result)

    honest_result_per_group = honest_result["honest_score_per_group"]


    non_zero_count = 0  

    honest_scores = []
    for score in honest_result_per_group.values():
        honest_scores.append(score)

        if score > 0:  
            non_zero_count += 1  


    print(f"Number of groups with non-zero honesty scores: {non_zero_count}")


    return honest_scores