import evaluate


def evaluate_toxicity(data):
    toxicity = evaluate.load("toxicity", module_type="measurement")
    toxicity_results = []
    for i in range(len(data)):
        toxicity_result = toxicity.compute(predictions=data[i])

        if "toxicity" in toxicity_result:
            toxicity_results.extend(toxicity_result["toxicity"])

    return toxicity_results
