# Blog Automation: Streamlining Content Creation with AI

This project, **Blog Automation**, leverages the power of artificial intelligence to automate various aspects of blog content creation for Hashnode. By integrating Google's Generative AI and Unsplash API, this application streamlines the process of generating topics, crafting engaging content, and sourcing relevant images.

## Technical Overview

The **Blog Automation** project utilizes several key technologies:

- **@google/generative-ai:** This library provides access to Google's powerful Generative AI models, enabling the application to generate creative and informative blog content.
- **dotenv:** This package facilitates secure management of environment variables, ensuring sensitive API keys and credentials are not exposed.
- **node-fetch:** This library allows the application to make HTTP requests to external APIs, such as Unsplash and Hashnode.
- **unsplash-js:** This library interacts with the Unsplash API, allowing the application to search and retrieve relevant images for blog posts.

These technologies work together to automate the following tasks:

1. **Topic Selection:** The application utilizes Google's Generative AI to analyze a predefined list of keywords and generate unique, engaging blog post topics. This includes generating titles, subtitles, and relevant tags.
2. **Content Creation:** Once a topic is selected, the application uses Generative AI to create a full-fledged blog post in markdown format. This content is written in a technical tone, utilizes transition words and active voice, and adheres to a beginner-friendly guide style with multiple sections, code snippets, and examples.
3. **Image Sourcing:** The application leverages the Unsplash API to search for images based on the chosen topic. It then selects and retrieves a relevant image to accompany the blog post.
4. **Hashnode Integration:** Finally, the application interacts with the Hashnode API to seamlessly publish the generated content, including title, subtitle, markdown content, tags, and cover image, to the designated Hashnode publication.

## Workflow and Automation

The **Blog Automation** project is designed to run automatically on a scheduled basis. This is achieved through GitHub Actions workflows:

- **Node.js Workflow:** This workflow triggers daily and executes the core logic of the application. It utilizes the environment variables stored in `.env` to access the required API keys and credentials.
- **Python Workflow:** This workflow runs a Python script (`hashnode.py`) which interacts with the Hashnode API to publish the generated content.

This automation ensures consistent and timely publication of high-quality blog content without manual intervention.

## Code Examples and Tables

Here are some examples of code and data structures used in the project:

**Prompt.js:** This file defines the prompt used to guide Google's Generative AI in creating blog post topics.

```javascript
export const prompt = `Create a json code with the fields of title, subtitle, tags, image...`;
```

_Use code with caution._

**GenAI.js:** This file contains the `GenAi` class which interacts with Google's Generative AI to generate topics and markdown content.

```javascript
export class GenAi {
  constructor(GEMINI_KEY) { ... }

  topicSelection = async () => { ... }

  markdownMaker = async (title, tags) => { ... }
}
```

_Use code with caution._

**UnsplashPhoto.js:** This file defines the `Unsplash` class which utilizes the Unsplash API to retrieve images.

```javascript
export class Unsplash {
  constructor(accessKey) { ... }

  async getPhoto(query, page, per_page, orientation) { ... }
}
```

_Use code with caution._

**Hashnode.js:** This file contains the `HashNode` class which interacts with the Hashnode API to publish content.

```javascript
export class HashNode {
  constructor(Authorization, publicationId) { ... }

  async createPost(title, subtitle, contentMarkdown, tags, coverImageURL) { ... }
}
```

_Use code with caution._

**data/topics.json:** This file stores a mapping of keywords to their corresponding Hashnode tag information.

```json
{
  "javascript": { ... },
  "general programming": { ... },
  ...
}
```

_Use code with caution._

These examples showcase how various components of the project interact and utilize data to automate the blog content creation process.

## Benefits and Impact

The **Blog Automation** project offers several benefits:

- **Increased Efficiency:** Automating content creation frees up time and resources for other tasks.
- **Consistent Content:** Scheduled workflows ensure regular publication of fresh content.
- **Improved Creativity:** AI can help generate new and unique content ideas.
- **Enhanced SEO:** Targeting relevant keywords and tags can improve search engine ranking.

By streamlining content creation, this project can significantly benefit bloggers and content creators, allowing them to focus on other aspects of their work while maintaining a consistent flow of high-quality content.
