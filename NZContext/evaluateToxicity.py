import evaluate


def evaluate_toxicity(data):
    toxicity = evaluate.load("toxicity", module_type="measurement")
    toxicity_results = []
    for i in range(len(data)):
        toxicity_result = toxicity.compute(predictions=data[i])
        toxicity_results.append(toxicity_result)


    return toxicity_results
