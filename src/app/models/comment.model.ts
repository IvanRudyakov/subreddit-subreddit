import { User } from "./user.model";

export interface SubredditComment {
    _id: string;
    subredditHandle: string;
    comment: string;
    likes: number;
    commenter?: User;
}