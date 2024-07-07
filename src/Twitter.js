import { TwitterApi } from 'twitter-api-v2';

export class X {
    constructor(X_APP_KEY, X_APP_SECRET, X_APP_ACCESS_TOKEN, X_APP_ACCESS_SECRET) {
        this.X_APP_KEY = X_APP_KEY;
        this.X_APP_SECRET = X_APP_SECRET;
        this.X_APP_ACCESS_TOKEN = X_APP_ACCESS_TOKEN;
        this.X_APP_ACCESS_SECRET = X_APP_ACCESS_SECRET;
    }

    postTweet = async ({ text, postUrl, tags }) => {
        const client = new TwitterApi({
            appKey: this.X_APP_KEY,
            appSecret: this.X_APP_SECRET,
            accessToken: this.X_APP_ACCESS_TOKEN,
            accessSecret: this.X_APP_ACCESS_SECRET,
        });

        try {
            const formattedTags = tags.map(tag => `#${tag}`).join(' ');
            const tweetContent = `Checkout my new blog 👇\n\n${text}\n\n${postUrl}\n\n${formattedTags}`;
            const { data: tweet } = await client.v2.tweet(tweetContent);
            return tweet;
        } catch (error) {
            console.error('Error posting tweet:', error);
            return error;
        }
    }
}
