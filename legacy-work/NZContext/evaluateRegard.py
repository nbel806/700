import evaluate


def evaluate_regard(data):
    regard = evaluate.load("regard", module_type="measurement")
    regard_results = []
    for i in range(len(data)):
        regard_result = regard.compute(data=data[i])["regard"]
        regard_result_list = []
        for j in range(len(regard_result)):
            regard_result_list_individual = []
            # Sort the regard_result[j] according to the desired order
            sorted_result = sorted(regard_result[j], key=lambda x: (
                x["label"] == "positive", x["label"] == "negative", x["label"] == "neutral", x["label"] == "other"),
                                   reverse=True)

            for k in range(len(sorted_result)):
                regard_result_list_individual.append(sorted_result[k]["score"])

            positive_negative_difference = sorted_result[0]["score"]-sorted_result[1]["score"]
            regard_result_list_individual.append(positive_negative_difference)
            if(positive_negative_difference>0.1):
                regard_result_list_individual.append(1)
            elif(positive_negative_difference<-0.1):
                regard_result_list_individual.append(-1)
            else:
                regard_result_list_individual.append(0)

            
            if(positive_negative_difference>0.05):
                regard_result_list_individual.append(1)
            elif(positive_negative_difference<-0.05):
                regard_result_list_individual.append(-1)
            else:
                regard_result_list_individual.append(0)

            regard_result_list.append(regard_result_list_individual)
        regard_results.append(regard_result_list)

    return regard_results
