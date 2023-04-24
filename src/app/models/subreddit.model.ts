export interface Subreddit {
    name: string;
    handle: string;
    description: string;
    // created: Date;
    subscribers: number;
    isNSFW: boolean;
}