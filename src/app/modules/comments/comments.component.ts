import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubredditComment } from 'src/app/models/comment.model';
import { User } from 'src/app/models/user.model';
import { CommentsService } from 'src/app/services/comments.service';
import { ReportsService } from 'src/app/services/reports.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'comments',
    templateUrl: './comments.component.html'
})
export class CommentsComponent {

    @Input() comments: SubredditComment[] = [];
    @Input() ownUser: User = { currentlyloggedIn: 'anonymous' }
    @Input() showHandle: boolean = false;

    reportVisible: string = ''; // id of report currently visible
    editVisible: string = '';
    reportText: string = '';
    editText: string = '';


    constructor(private commentsService: CommentsService, private reportsService: ReportsService, private router: Router) { }

    upvote(id: string) {
        const oldLikeState = this.calculateLikeState(id);
        const newLikeState = oldLikeState == 'like' ? 'none' : 'like';
        const newLikeCounter = this.calculateLikeCounter(id, oldLikeState, newLikeState);
        this.commentsService.updateLike(id, newLikeCounter, newLikeState);
        this.updateMeLike(id, newLikeState, newLikeCounter);
    }

    downvote(id: string) {
        const oldLikeState = this.calculateLikeState(id);
        const newLikeState = oldLikeState == 'dislike' ? 'none' : 'dislike'
        const newLikeCounter = this.calculateLikeCounter(id, oldLikeState, newLikeState);
        this.commentsService.updateLike(id, newLikeCounter, newLikeState);
        this.updateMeLike(id, newLikeState, newLikeCounter);
    }

    edit(id: string, commentText: string) {
        this.editText = '';
        if (this.editVisible == id) {
            this.editVisible = '';
        }
        else {
            this.editVisible = id;
            this.editText = commentText;
        }
    }

    submitEdit() {
        this.comments.find(c => c._id == this.editVisible).comment = this.editText;
        this.commentsService.editComment(this.editVisible, this.editText);
        this.editVisible = '';
        this.editText = '';
    }

    remove(id: string) {
        this.commentsService.deleteComment(id);
        const commentIndex = this.comments.findIndex(c => c._id == id);
        this.comments.splice(commentIndex, 1);
    }

    toggleReport(id: string) {
        this.reportText = '';
        if (id == this.reportVisible) {
            this.reportVisible = '';
        }
        else {
            this.reportVisible = id;
        }
    }

    async submitReport() {
        await this.reportsService.postReport(this.reportVisible, this.reportText);
        this.reportVisible = '';
        this.reportText = '';
        alert('Report Successfully Submitted. Our Mod Team will Review Shortly.');
    }

    calculateLikeState(id: string) {
        if (this.ownUser.commenter?.likes?.includes(id)) {
            return 'like';
        }
        if (this.ownUser.commenter?.dislikes?.includes(id)) {
            return 'dislike';
        }
        return 'none';
    }

    calculateLikeCounter(id: string, oldLikeState: string, newLikeState: string) {
        const currentCounter = this.comments.find(c => c._id == id).likes;
        const m = {
            'dislike': -1,
            'none': 0,
            'like': 1
        };
        return currentCounter + m[newLikeState] - m[oldLikeState];
    }

    gotoSubreddit(handle: string) {
        this.router.navigate(['app', 'subreddit', handle]);
    }

    gotoProfile(id: string) {
        this.router.navigate(['app', 'profile', id]);
    }

    updateMeLike(id: string, newLikeState: string, newLikeCounter: number) {
        const likesWithoutComment = this.ownUser.commenter.likes.filter(i => i !== id);
        const dislikesWithoutComment = this.ownUser.commenter.dislikes.filter(i => i !== id);
        console.log(likesWithoutComment);
        console.log(dislikesWithoutComment);
        const newLikes = [...likesWithoutComment, ...(newLikeState === 'like' ? [id] : [])];
        const newDislikes = [...dislikesWithoutComment, ...(newLikeState === 'dislike' ? [id] : [])];
        this.ownUser.commenter.likes = newLikes;
        this.ownUser.commenter.dislikes = newDislikes;
        console.log(newLikes);
        console.log(newDislikes)
        this.comments.find(c => c._id == id).likes = newLikeCounter;
    }

}