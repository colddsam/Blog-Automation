import fetch from 'node-fetch';
import dotenv from 'dotenv'

dotenv.config()

export class HashNode{
    constructor(Authorization, publicationId) {
        this.publicationId = publicationId
        this.graphqlEndpoint = "https://gql.hashnode.com/"
        this.headers={
            'Content-Type': 'application/json',
            'Authorization': Authorization
        };
        this.mutationQuery = `
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
    }

    async createPost(title, subtitle, contentMarkdown, tags, coverImageURL) {
        const mutationVariables = {
            "input": {
                "title": title,
                "subtitle": subtitle,
                "contentMarkdown": contentMarkdown,
                "coverImageOptions": {
                    "coverImageURL": coverImageURL
                },
                "tags": tags,
                "disableComments": false,
                "publicationId": this.publicationId
            }
        
        };
        fetch(this.graphqlEndpoint, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ query: this.mutationQuery, variables: mutationVariables })
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
