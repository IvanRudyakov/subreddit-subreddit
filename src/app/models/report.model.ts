import { SubredditComment } from "./comment.model";
import { User } from "./user.model";

export interface Report {
    readonly _id: string;
    readonly comment?: SubredditComment;
    readonly reporter?: User;
    readonly reportDescription: string;
    readonly reportAccepted: string; // 'true', 'false', or 'pending'
}