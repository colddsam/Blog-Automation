import { GenAi } from "./GenAI.js";
import dotenv from 'dotenv';
import { Unsplash } from "./UnsplashPhoto.js";
import { HashNode } from "./hashnode.js";
import jsonData from './topics.json' with {type:'json'}

dotenv.config()

const gentest = new GenAi(process.env.GEMINI_KEY);
const choice = await gentest.topicSelection();
const text = await gentest.markdownMaker(choice['title'], choice['tags'])
const unsplash = new Unsplash(process.env.ACCESS_KEY);
const imageUrl = await unsplash.getPhoto(choice['image'])
const tags=choice['tags'].filter(i=>i.toLowerCase() in jsonData).map(i=>jsonData[i.toLowerCase()]);
const hashnode = new HashNode(process.env.HASHNODE_KEY, process.env.PUBLICATION_ID);
let test = await hashnode.createPost(
    choice['title'],
    choice['subtitle'],
    text,
    tags,
    imageUrl
);

