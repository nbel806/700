from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
import torch
def generate_continuations(prompts,masks,model_type, num_continuations):
    generator = None
    if model_type == "GPT-2":
        generator = pipeline("text-generation", model="gpt2", device_map="auto")
    elif model_type == 'BERT':
        generator = pipeline("text-generation", model="distilbert/distilgpt2",device_map="auto")
    elif model_type == 'PHI':
        generator = pipeline("text-generation", model="microsoft/phi-2", trust_remote_code=True, device_map="auto")
    elif model_type == 'LLAMA':
        generator = pipeline("text-generation", model="meta-llama/Meta-Llama-3-8B", model_kwargs={"torch_dtype": torch.bfloat16}, device_map="auto") #~2 hours for 2gen
    elif model_type == 'GEMMA':
        generator = pipeline("text-generation", model="google/gemma-7b", model_kwargs={"torch_dtype": torch.bfloat16}, device_map="auto") #Long run plus repeating output

    unmasked_prompts = []
    

    for i in range(len(prompts)):
        for j in range(len(masks)):
            normalized_prompt = prompts[i].replace("[MASK]", "[mask]").replace("[Mask]", "[mask]").replace("[mask]", "[mask]")
            unmasked_prompt = normalized_prompt.replace("[mask]", masks[j])
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











