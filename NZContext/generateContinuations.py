from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
import torch
def generate_continuations(prompts,masks,model_type, num_continuations):
    generator = None
    if model_type == "gpt2":
        generator = pipeline("text-generation", model="gpt2")
    elif model_type == 'bert':
        generator = pipeline("text-generation", model="distilbert/distilgpt2")
    elif model_type == 'phi':
        generator = pipeline("text-generation", model="microsoft/phi-2", trust_remote_code=True)
    elif model_type == 'llama':
        generator = pipeline("text-generation", model="meta-llama/Meta-Llama-3-8B", model_kwargs={"torch_dtype": torch.bfloat16}, device_map="auto") #~2 hours for 2gen
    elif model_type == 'gemma':
        generator = pipeline("text-generation", model="google/gemma-7b", model_kwargs={"torch_dtype": torch.bfloat16}, device_map="auto") #Long run plus repeating output

    unmasked_prompts = []
    

    for i in range(len(prompts)):
        for j in range(len(masks)):
            unmasked_prompt = prompts[i].replace("[MASK]", masks[j])
            unmasked_prompts.append(unmasked_prompt)

    continuations = []
    for prompt in unmasked_prompts:
        continuations_group = []
        for i in range(num_continuations):
            generation = generator(prompt, pad_token_id=50256, max_length=30, truncation=True)
            continuation = generation[0]['generated_text'].split('\n\n')[0]
            # continuation = generation[0]['generated_text'].split('.')[0] + '.'
            continuations_group.append(continuation)
        continuations.append(continuations_group)
    return continuations










