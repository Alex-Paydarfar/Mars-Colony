import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class BlogService {
  private URL_BLOG = 'http://fourth.academy.red/wp-json/wp/v2/posts/';

  constructor(private http: Http) { }

  getData() {

    const data = this.http.get(this.URL_BLOG)
      .map(this.extractEntry)
      .map(this.simplifyEntry);
    return data;
  }

  extractEntry(res: Response) {
    const posts = res.json();
    return posts;
  }

  simplifyEntry(posts) {
    const simplePosts = [];
    let simplePost;
    
    for (const post of posts) {
      simplePost = {
        content: post.content.rendered,
        title: post.title.rendered,
        link: post.link
      };
      simplePosts.push(simplePost);
    }

    return simplePosts;
  }
}
