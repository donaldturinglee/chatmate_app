import axios from 'axios';
import {API_KEY} from './secret';

const endpoint = 'https://api.openai.com/v1';
export const APP_COLOR_MODE_KEY = 'app-color-mode';
const instance = axios.create({
  baseURL: endpoint,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const make_request = async (prompt: string) => {
  return await instance
    .post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: prompt}],
      temperature: 0.7,
    })
    .then(function (response) {
      const generated_response = response.data.choices[0].message.content;
      console.log('OpenAI response', generated_response);
      return generated_response;
    })
    .catch(function (error: any) {
      console.log('OpenAI error', error);
      return undefined;
    });
};
