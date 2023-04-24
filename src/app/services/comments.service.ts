import { Injectable } from "@angular/core";
import { SubredditComment } from "../models/comment.model";
import { sleep } from "../utils/utils";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class CommentsService {

    constructor(private http: HttpClient) {}

    async getCommentsForSubredditOld(subredditHandle: string): Promise<SubredditComment[]> {
        await sleep(1000);
        return [
            {
                _id: '0',
                subredditHandle: 'r/wcgw',
                comment: 'great comment',
                likes: 69
            },
            {
                _id: '1',
                subredditHandle: 'r/wcgw',
                comment: 'great comment!!!!!!!',
                likes: 1
            },
            {
                _id: '3',
                subredditHandle: 'r/pcm',
                comment: 'Shitty comment',
                likes: -100
            },
            {
                _id: '4',
                subredditHandle: 'r/pcm',
                comment: 'unliked comment comment text',
                likes: 4
            }
        ]
    }


    async getCommentsHomeOld(): Promise<SubredditComment[]> {
        await sleep(1000);
        return [
            {
                _id: '0',
                subredditHandle: 'r/wcgw',
                comment: 'great comment',
                likes: 69
            },
            {
                _id: '1',
                subredditHandle: 'r/wcgw',
                comment: 'great comment!!!!!!!',
                likes: 1
            }
        ]
    }


    async getHomeComments(): Promise<SubredditComment[]> {
        return await this.http.get<any>('http://localhost:4000/api/comments/home_comments', { withCredentials: true }).toPromise();
    }

    async getSubredditComments(handle: string): Promise<SubredditComment[]> {
        return await this.http.get<any>('http://localhost:4000/api/comments/subreddit_comments', {params: new HttpParams().append('handle', handle), withCredentials: true}).toPromise();
    }

    async postComment(handle: string, text: string) {
        return await this.http.post<any>('http://localhost:4000/api/comments/post_comment', {handle, text}, { withCredentials: true }).toPromise();
    }

    async editComment(id: string, text: string) {
        return await this.http.put<any>('http://localhost:4000/api/comments/edit_comment', {id, text}, { withCredentials: true }).toPromise();
    }

    async deleteComment(id: string) {
        return await this.http.delete<any>('http://localhost:4000/api/comments/delete_comment', {params: new HttpParams().append('id', id), withCredentials: true}).toPromise();
    }

    async updateLike(comment_id: string, newLikeCounter: number, like: 'like' | 'dislike' | 'none') {
        return await this.http.put<any>('http://localhost:4000/api/comments/updateLike', {comment_id, newLikeCounter, like}, { withCredentials: true }).toPromise();
    }

}