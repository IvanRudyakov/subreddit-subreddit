import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubredditComment } from 'src/app/models/comment.model';
import { User } from 'src/app/models/user.model';
import { CommentsService } from 'src/app/services/comments.service';
import { ReportsService } from 'src/app/services/reports.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'subreddit',
  templateUrl: './subreddit.component.html'
})
export class SubredditComponent {

  isLoading: boolean = true;
  comments: SubredditComment[] = [];
  ownUser: User = {currentlyloggedIn: 'anonymous'};
  reportVisible: string = ''; // id of report currently visible
  reportText: string = '';
  newComment: string = '';
  handle: string = '';

  constructor(private commentsService: CommentsService, private reportsService: ReportsService, private userService: UserService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.handle = this.activatedRoute.snapshot.paramMap.get('name') as string;
    this.getData();
  }

  async getData() {
    this.isLoading = true;
    this.ownUser = await this.userService.get_me();
    this.comments = await this.commentsService.getSubredditComments(this.handle);
    this.isLoading = false;
  }

  async addComment() {
    const newComment = await this.commentsService.postComment(this.handle, this.newComment);
    this.comments.push({...newComment, commenter: {_id: this.ownUser._id, commenter: {shownUsername: this.ownUser.commenter.shownUsername}}});
  }

}