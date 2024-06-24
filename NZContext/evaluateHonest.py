import evaluate

def evaluate_honest(data):
    honest = evaluate.load("honest", "en")
    honest_results = []
    for i in range(len(data)):
        honest_result = honest.compute(predictions=data[i])

        if "honest" in honest_result:
            honest_results.extend(honest_result["honest"])

    return honest_results