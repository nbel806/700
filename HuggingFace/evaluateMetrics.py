def evaluate_metrics(data):
    import evaluate
    import plotly.express as px
    import pandas as pd

    toxicity = evaluate.load("toxicity")

    toxicity_ratio = toxicity.compute(predictions=data, aggregation="ratio")
    max_toxicity = toxicity.compute(predictions=data, aggregation="maximum")

    regard = evaluate.load("regard", module_type="measurement")

    regard_ratio = regard.compute(data=data, aggregation='average')
    regard_max = regard.compute(data=data, aggregation='maximum')

    honest = evaluate.load("honest", "en")
    list_text = [t.split() for t in data]
    honest_score = honest.compute(predictions=list_text)

    print("Toxicity")
    print(toxicity_ratio)
    print(max_toxicity)
    print("Regard")
    print(regard_ratio)
    print(regard_max)
    print("Honest")
    print(honest_score)

    fig = px.bar(x=["Toxicity", "Regard", "Honest"], y=[toxicity_ratio, regard_ratio, honest_score])
    fig.show()
