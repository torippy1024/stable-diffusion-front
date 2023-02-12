import DIFFUSION_CONFIG from '../../const/diffusion';

const fetchDiffusion = async (
  prompts?: string[],
  negativePrompts?: string[],
) => {
  const commonPrompt = DIFFUSION_CONFIG.COMMON_PROMPT;
  const commonNegativePrompt = DIFFUSION_CONFIG.COMMON_NEGATIVE_PROMPT;

  const prompt = prompts ? [commonPrompt, ...prompts].join(', ') : commonPrompt;
  const negativePrompt = negativePrompts
    ? [commonNegativePrompt, ...negativePrompts].join(', ')
    : commonNegativePrompt;

  const url = `http://localhost:8000/api/diffusion?prompt=${prompt}&negative_prompt=${negativePrompt}`;
  const data = await fetch(url)
    .then((r) => r.json())
    .catch((e) => console.log(e));
  return data.url as string;
};

export default fetchDiffusion;
