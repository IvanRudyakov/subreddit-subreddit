import { SubredditComment } from "./comment.model";
import { Report } from "./report.model";

type Role = 'admin' | 'commenter' | 'anonymous'

interface Admin {
    _id?: string;
    isSuperAdmin: boolean; // Can elevate users to admin and moderate other admins.
    // readonly permittedSubreddits?: string[]; // list of permitted subreddit handles. Undefined for super admins.
    // readonly reportsHandled?: Report[];
}

interface Commenter {
    _id?: string;
    shownUsername: string;
    bio: string;
    likes?: string[]; // list of comment ID's liked by user.
    dislikes?: string[];
    // readonly comments?: SubredditComment[];
}

export interface User {
    _id?: string;
    loginUsername?: string;
    password?: string;
    dateCreated?: string; // yyyy=-mm-dd
    profilePublic?: boolean;
    rolesAvailable?: Role[];
    currentlyloggedIn?: Role;
    commenter?: Commenter;
    admin?: Admin;
}
