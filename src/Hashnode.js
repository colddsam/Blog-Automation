import fetch from 'node-fetch';
import { GenAi } from "./GenAI.js";
import { Unsplash } from "./UnsplashPhoto.js";
import jsonData from '../data/topics.json' with {type:'json'}



export class HashNode{
    constructor(Authorization, publicationId,GEMINI_KEY,ACCESS_KEY) {
        this.publicationId = publicationId
        this.Authorization = Authorization;
        this.GEMINI_KEY = GEMINI_KEY;
        this.ACCESS_KEY = ACCESS_KEY;
    }

    async createPost() {
        const gentest = new GenAi(this.GEMINI_KEY);
        const choice = await gentest.hashnodeTopicSelection();
        const text = await gentest.markdownMaker(choice['title'], choice['tags'])
        const unsplash = new Unsplash(this.ACCESS_KEY);
        const imageUrl = await unsplash.getPhoto(choice['image'])
        const tags=choice['tags'].filter(i=>i.toLowerCase() in jsonData).map(i=>jsonData[i.toLowerCase()]);
        const graphqlEndpoint = "https://gql.hashnode.com/"
        const headers={
            'Content-Type': 'application/json',
            'Authorization': this.Authorization
        };
        const mutationQuery = `
            mutation PublishPost($input: PublishPostInput!) {
                publishPost(input: $input) {
                    post {
                        id
                        slug
                        title
                        subtitle
                    }
                }
            }`;
        const mutationVariables = {
            "input": {
                "title": choice['title'],
                "subtitle": choice['subtitle'],
                "contentMarkdown": text,
                "coverImageOptions": {
                    "coverImageURL": imageUrl
                },
                "tags": tags,
                "disableComments": false,
                "publicationId": this.publicationId
            }
        
        };
        fetch(graphqlEndpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ query: mutationQuery, variables: mutationVariables })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`GraphQL request failed with status code: ${response.status}`);
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
        
    }
}

// const hashnode = new HashNode(process.env.HASHNODE_KEY, process.env.PUBLICATION_ID);
// let test= await hashnode.createPost(
//     "testHash",
//     "subtitle of testhash",
//     "lets start the journey",
//     "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODMzMjl8MHwxfHNlYXJjaHw0fHxjb2RpbmclMjBvbiUyMGxhcHRvcHxlbnwwfDB8fHwxNzExNDY5NjcxfDA&ixlib=rb-4.0.3&q=80&w=1080"
// )
