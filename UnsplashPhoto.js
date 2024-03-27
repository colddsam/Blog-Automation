import { createApi } from 'unsplash-js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export class Unsplash {
  constructor(accessKey) {
    this.unsplash = createApi({ accessKey, fetch });
  }

  async getPhoto(query, page = 1, per_page = 8, orientation = 'landscape' ) {
    try {
      const response  = await this.unsplash.search.getPhotos({
        query,
        page,
        per_page,
        orientation,
      });
        const aRandomPhoto = response.response.results[Math.floor(Math.random() * 8)];
        const photoUrl = aRandomPhoto.urls.regular;
        return photoUrl;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}


// const unsplash = new Unsplash(process.env.ACCESS_KEY);
// await unsplash.getPhoto('coding on laptop');