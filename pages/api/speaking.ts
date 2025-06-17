import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIInstance } from '@/utils/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt in request body' });
  }

  try {
    const completion = await OpenAIInstance.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4o',
    });

    res.status(200).json({ response: completion.choices[0].message.content });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
