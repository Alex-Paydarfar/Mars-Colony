import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class BlogService {
  private URL_BLOG = 'http://fourth.academy.red/wp-json/wp/v2/posts/';

  constructor(private http: Http) { }

  getData() {
    // Perform Async request
    const data = this.http.get(this.URL_BLOG)
      .map(this.extractEntry)
      .map(this.simplifyEntry);
    return data;
  }

  extractEntry(res: Response) {
    // Parse JSON to return an array of JS Objects
    const posts = res.json();
    return posts;
  }

  simplifyEntry(posts) {
    const simplePosts = [];
    let simplePost;
    // Choose what data you want to pull from the WP REST API
    for (const post of posts) {
      simplePost = {
        content: post.content.rendered,
        title: post.title.rendered,
        link: post.link
      };
      simplePosts.push(simplePost);
    }

    /* Returns only the information required for our use-case -
      be sure to modify the interface at models/post.ts if the
      use-case changes here. */
    return simplePosts;
  }
}
