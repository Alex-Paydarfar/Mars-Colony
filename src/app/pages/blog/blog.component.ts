import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  providers: [BlogService]
})
export class BlogComponent implements OnInit {
  public listPosts: Post [] = [];
  constructor(private blogService: BlogService) { }
  ngOnInit() {
    this.blogService.getData().subscribe(posts => {
      for (const post of posts) {
        this.listPosts.push(post);
      }
    });
  }

}
