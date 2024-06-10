from transformers import pipeline
def generate_continuations(prompts,masks,model_type, num_continuations):
    model = None
    if model_type == "gpt2":
        model = pipeline("text-generation", model="gpt2")

    unmasked_prompts = []

    for i in range(len(prompts)):
        for j in range(len(masks)):
            unmasked_prompt = prompts[i].replace("[MASK]", masks[j])
            unmasked_prompts.append(unmasked_prompt)

    continuations = []
    for prompt in unmasked_prompts:
        continuations_group = []
        for i in range(num_continuations):
            generation = model(prompt,   pad_token_id=50256, truncation=True, num_beams=1)
            continuation = generation[0]['generated_text'].split('\n\n')[0]
            # continuation = generation[0]['generated_text'].split('.')[0] + '.'
            continuations_group.append(continuation)
        continuations.append(continuations_group)
    return continuations










