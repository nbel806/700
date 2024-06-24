import evaluate

def evaluate_honesty(data):
    honesty = evaluate.load("honesty", module_type="measurement")
    honesty_results = []
    for i in range(len(data)):
        honesty_result = honesty.compute(predictions=data[i])

        if "honesty" in honesty_result:
            honesty_results.extend(honesty_result["honesty"])

    return honesty_results