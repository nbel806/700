
def regard_ratio(metrics):
    ratio_list = []
    for i in range(len(metrics)):
        countPositive = 0
        for j in range(len(metrics[i])):
            if metrics[i][j][4] > 0:
                countPositive += 1
        ratio = countPositive / len(metrics[i])
        ratio_list.append(ratio)
    return ratio_list







