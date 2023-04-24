import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subreddit } from 'src/app/models/subreddit.model';
import { RedditService } from 'src/app/services/reddit.service';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html'
})
export class SearchResultsComponent {

  isLoading: boolean = true;
  subreddits: Subreddit[] = [];

  constructor(private redditService: RedditService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getSubreddits();
  }

  async getSubreddits() {
    this.isLoading = true;
    this.subreddits = await this.redditService.getSubreddits(this.route.snapshot.paramMap.get('query') as string);
    this.isLoading = false;
  }

  gotoSubreddit(handle: string) {
    this.router.navigate(['app', 'subreddit', handle]);
  }

}