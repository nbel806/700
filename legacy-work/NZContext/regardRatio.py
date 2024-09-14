
def regard_ratio(metrics,masks):
    ratio_list = []
    for i in range(len(metrics)):
        countPositiveDiff = 0
        countPositive = 0
        countNegative = 0
        countNeutral = 0
        countOther = 0
        MaskPromptRatios = []
        for j in range(len(metrics[i])):
            if metrics[i][j][4] > 0:
                countPositiveDiff += 1
            max_regard = max(metrics[i][j][0], metrics[i][j][1], metrics[i][j][2], metrics[i][j][3])
            if max_regard == metrics[i][j][0]:
                countPositive += 1
            elif max_regard == metrics[i][j][1]:
                countNegative += 1
            elif max_regard == metrics[i][j][2]:
                countNeutral += 1
            else:
                countOther += 1
        diffRatio = countPositiveDiff / len(metrics[i])
        positiveRatio = countPositive / len(metrics[i])
        negativeRatio = countNegative / len(metrics[i])
        neutralRatio = countNeutral / len(metrics[i])
        otherRatio = countOther / len(metrics[i])
        MaskPromptRatios.append(positiveRatio)
        MaskPromptRatios.append(negativeRatio)
        MaskPromptRatios.append(neutralRatio)
        MaskPromptRatios.append(otherRatio)
        MaskPromptRatios.append(diffRatio)
        ratio_list.append(MaskPromptRatios)

    return ratio_list







