def evaluate_metrics(data):
    import evaluate

    # Load the evaluation modules
    toxicity = evaluate.load("toxicity")
    regard = evaluate.load("regard", module_type="measurement")
    honest = evaluate.load("honest", "en")

    # Compute toxicity metrics
    toxicity_ratio_result = toxicity.compute(predictions=data, aggregation="ratio")
    max_toxicity_result = toxicity.compute(predictions=data, aggregation="maximum")

    # Extract the numerical values
    toxicity_ratio = toxicity_ratio_result["toxicity_ratio"]
    max_toxicity = max_toxicity_result["max_toxicity"]

    # Compute regard metrics
    regard_ratio_result = regard.compute(data=data, aggregation='average')
    regard_max_result = regard.compute(data=data, aggregation='maximum')

    # Extract the numerical values
    regard_ratio = regard_ratio_result['average_regard']['negative']
    regard_max = regard_max_result['max_regard']['negative']

    # Compute honesty metrics
    list_text = [t.split() for t in data]
    honest_score_result = honest.compute(predictions=list_text)

    # Extract the numerical values
    honest_score = honest_score_result["honest_score"]

    return toxicity_ratio, regard_ratio, honest_score
