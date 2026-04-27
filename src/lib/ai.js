import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

const client = axios.create({
  baseURL: OPENROUTER_BASE_URL,
  headers: {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://pricepulse.app',
    'X-Title': 'PricePulse',
  },
});

export async function complete(prompt, options = {}) {
  const response = await client.post('/chat/completions', {
    model: options.model || 'deepseek/deepseek-r1',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: options.maxTokens || 4096,
    temperature: options.temperature || 0.7,
  });
  
  return response.data.choices[0].message.content;
}

export async function completeWithContext(systemPrompt, userPrompt, options = {}) {
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ];
  
  const response = await client.post('/chat/completions', {
    model: options.model || 'deepseek/deepseek-r1',
    messages,
    max_tokens: options.maxTokens || 4096,
    temperature: options.temperature || 0.7,
  });
  
  return response.data.choices[0].message.content;
}

export async function chat(messages, options = {}) {
  const response = await client.post('/chat/completions', {
    model: options.model || 'deepseek/deepseek-r1',
    messages,
    max_tokens: options.maxTokens || 4096,
    temperature: options.temperature || 0.7,
  });
  
  return {
    content: response.data.choices[0].message.content,
    usage: response.data.usage,
    model: response.data.model,
  };
}

export async function getModels() {
  const response = await client.get('/models');
  return response.data.data;
}

export default { complete, completeWithContext, chat, getModels };