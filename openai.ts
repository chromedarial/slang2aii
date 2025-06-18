import OpenAI from 'openai';

export const OpenAIInstance = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});
