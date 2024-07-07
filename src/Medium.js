import axios from 'axios';
import { GenAi } from "./GenAI.js";
import { Unsplash } from "./UnsplashPhoto.js";

export class Medium {
    constructor(GEMINI_KEY, ACCESS_KEY, MEDIUM_KEY, MEDIUM_ID) {
        this.GEMINI_KEY = GEMINI_KEY;
        this.ACCESS_KEY = ACCESS_KEY;
        this.MEDIUM_KEY = MEDIUM_KEY;
        this.MEDIUM_ID = MEDIUM_ID;
    }

    createPost = async () => {
        const gentest = new GenAi(this.GEMINI_KEY);
        const choice = await gentest.mediumTopicSelection();
        let text = await gentest.markdownMaker(choice['title'], choice['tags']);
        const unsplash = new Unsplash(this.ACCESS_KEY);
        const imageUrl = await unsplash.getPhoto(choice['image']);

        const imageTxt = `# ${choice['title']}\n\n### ${choice['subtitle']}\n\n![cover image](${imageUrl})`;
        let newLineLength = 0;
        for (newLineLength; text[newLineLength] !== '\n'; newLineLength++);
        text = text.slice(newLineLength);
        text = imageTxt.concat(text);

        const postData = {
            title: choice['title'],
            contentFormat: "markdown",
            content: text,
            license: "all-rights-reserved",
            tags: choice['tags'],
            publishStatus: "public",
        };

        try {
            const response = await axios.post(`https://api.medium.com/v1/users/${this.MEDIUM_ID}/posts`, postData, {
                headers: {
                    'Authorization': `Bearer ${this.MEDIUM_KEY}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
            });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error.response.data);
            return error.response.data;
        }
    }
}