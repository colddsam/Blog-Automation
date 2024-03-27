import {GoogleGenerativeAI,HarmCategory,HarmBlockThreshold,} from "@google/generative-ai";
import { prompt } from "./Prompt.js";
import dotenv from 'dotenv';

dotenv.config()

export class GenAi{

  constructor(GEMINI_KEY) {
    this.GEMINI_KEY = GEMINI_KEY;
    this.MODEL_NAME = "gemini-1.0-pro";
  }

  topicSelection = async () => {
  const genAI = new GoogleGenerativeAI(this.GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: this.MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });

  const result = await chat.sendMessage(prompt);
    const response = await result.response;
    let restext = await response.text();
    restext = restext.slice(7, -3);
    return JSON.parse(restext);
  }
  
  markdownMaker = async(title,tags)=>{
  const genAI = new GoogleGenerativeAI(this.GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: this.MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });

  const result = await chat.sendMessage(`Create a blog post about “${title}” . Write it in a technical tone. Use transition words. Use active voice. Write over 5000 words. The blog post should be in a beginners guide style. Add title and subtitle for each section. It should have a minimum of 7 sections. use code snippets and example as much as possible also add different tables of stat for better understanding. Include the following keywords: ${tags.join(',')}. make it in markdown code format.`);
    const response = await result.response;
    const reText=await response.text()
    return reText;
}
  
}

// const gentest = new GenAi(process.env.GEMINI_KEY)
// const restext = await gentest.topicSelection();
// console.log(restext);
// const text=await gentest.markdownMaker(restext['title'],restext['tags'])
// console.log(text);