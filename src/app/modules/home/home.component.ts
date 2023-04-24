import { Component } from '@angular/core';
import { SubredditComment } from 'src/app/models/comment.model';
import { User } from 'src/app/models/user.model';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  isLoading: boolean = true;
  ownUser: User = {currentlyloggedIn: 'anonymous'};
  comments: SubredditComment[] = [];

  constructor(private commentsService: CommentsService, private userService: UserService) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.isLoading = true;
    this.ownUser = await this.userService.get_me();
    this.comments = await this.commentsService.getHomeComments();
    this.isLoading = false;
  }

}