import dotenv from 'dotenv';
import { Medium } from './src/Medium.js';
import { HashNode } from './src/Hashnode.js';
import { X } from './src/Twitter.js';
dotenv.config();

async function main() {
    const hashnode = new HashNode(process.env.HASHNODE_KEY, process.env.PUBLICATION_ID, process.env.GEMINI_KEY, process.env.ACCESS_KEY);
    await hashnode.createPost();

    const medium = new Medium(process.env.GEMINI_KEY, process.env.ACCESS_KEY, process.env.MEDIUM_KEY, process.env.MEDIUM_ID);
    const res = await medium.createPost();

    const twitterClient = new X(
        process.env.X_APP_KEY,
        process.env.X_APP_SECRET,
        process.env.X_APP_ACCESS_TOKEN,
        process.env.X_APP_ACCESS_SECRET
    );
    const tweetData = {
        text: res.data.title,
        postUrl: res.data.url,
        tags: res.data.tags
    };
    const resp = await twitterClient.postTweet(tweetData);
}

main();