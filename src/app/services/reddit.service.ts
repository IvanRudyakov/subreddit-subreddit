import { Injectable } from "@angular/core";
import { Subreddit } from "../models/subreddit.model";
import { sleep } from "../utils/utils";

@Injectable({
    providedIn: 'root',
})
export class RedditService {

    // export interface Subreddit {
    //     name: string;
    //     handle: string;
    //     description: string;
    //     created: Date;
    //     subscribers: number;
    //     isNSFW: boolean;
    // }

    async getSubredditsOld(query: string): Promise<Subreddit[]> {
        await sleep(1000);
        return [
            {
                name: 'pcm',
                handle: 'r/pcm',
                description: 'pcm description',
                subscribers: 4000,
                isNSFW: false
            },
            {
                name: 'wcgw',
                handle: 'r/wcgw',
                description: 'wcgw description',
                subscribers: 100,
                isNSFW: false
            } 
        ]
    }

    async getSubreddits(query: string): Promise<Subreddit[]> {
        const r = new (window as any).snoowrap({
            // lmao, no. I'll plug it in when I need to.
        });
        const rawData = await r.searchSubreddits({query});
        return rawData.map(r => ({
            name: r.title,
            handle: r.display_name,
            description: r.public_description,
            subscribers: r.subscribers,
            isNSFW: r.over18
        }));
    }


}