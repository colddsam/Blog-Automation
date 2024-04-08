import dotenv from 'dotenv';
import { Medium } from './src/Medium.js';
import { HashNode } from './src/Hashnode.js';
dotenv.config();

const hashnode = new HashNode(process.env.HASHNODE_KEY,process.env.PUBLICATION_ID,process.env.GEMINI_KEY,process.env.ACCESS_KEY);
await hashnode.createPost();

const medium = new Medium(process.env.GEMINI_KEY, process.env.ACCESS_KEY, process.env.MEDIUM_KEY, process.env.MEDIUM_ID);
await medium.createPost();
