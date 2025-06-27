import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/environment';
import { AIMessage } from '../types';

const genAI = new GoogleGenerativeAI(config.geminiApiKey!);


export async function callGemini(messages: AIMessage[], maxTokens: number): Promise<string> {
  const model = genAI.getGenerativeModel({ model: config.geminiModel });

  const chat = model.startChat({
    history: messages.slice(0, -1).map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    })),
  });

  const userMessage = messages[messages.length - 1].content;
  const result = await chat.sendMessage(userMessage);
  const response = await result.response;
  return response.text();
} 