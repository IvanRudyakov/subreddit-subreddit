import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { sleep } from "../utils/utils";
import { tap } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    loggedInUser: User | 'anonymous' | null = null;

    constructor(private http: HttpClient) {}

        // interface Admin {
        //     readonly isSuperAdmin: boolean; // Can elevate users to admin and moderate other admins.
        //     // readonly permittedSubreddits?: string[]; // list of permitted subreddit handles. Undefined for super admins.
        //     readonly reportsHandled: Report[];
        // }
        
        // interface Commenter {
        //     readonly shownUsername: string;
        //     readonly bio: string;
        //     readonly likes?: string[]; // list of comment ID's liked by user.
        //     readonly comments: SubredditComment[];
        // }
        
        // export interface User {
        //     readonly _id: string;
        //     readonly loginUsername?: string;
        //     readonly password?: string;
        //     readonly dateCreated?: Date;
        //     readonly profilePublic?: boolean;
        //     readonly rolesAvailable?: Role[];
        //     readonly rolesInfo?: {
        //         readonly consumer?: Commenter;
        //         readonly admin?: Admin;
        //     };
        // }
    
        // export interface SubredditComment {
        //     readonly _id: string;
        //     readonly subredditHandle: string;
        //     readonly comment: string;
        //     readonly likes: number;
        //     readonly commenter: User;
        // }


// export interface Report {
//     readonly _id: string;
//     readonly comment: Comment;
//     readonly reporterId: string;
//     readonly reportDescription: string;
//     readonly resolved: boolean;
//     readonly reportAccepted?: boolean;
//     readonly adminWhoResolved?: User;
// }

    async getMeOld(): Promise<User | 'anonymous'> {
        await sleep(1000);
        return {
            _id: 'test_id',
            loginUsername: 'test_login',
            password: 'pass',
            dateCreated: '2012=01-02',
            profilePublic: true,
            rolesAvailable: ['admin', 'commenter'],
            currentlyloggedIn: 'admin',
            // rolesInfo: {
            //     commenter: {
            //         shownUsername: 'haha',
            //         bio: 'bio haha',
            //         likes: ['0', '1', '2'],
            //         comments: [
            //             {
            //                 _id: '0',
            //                 subredditHandle: 'r/wcgw',
            //                 comment: 'great comment',
            //                 likes: 69
            //             },
            //             {
            //                 _id: '1',
            //                 subredditHandle: 'r/wcgw',
            //                 comment: 'great comment!!!!!!!',
            //                 likes: 1
            //             },
            //         ]
            //     },
            //     admin: {
            //         isSuperAdmin: true,
            //         reportsHandled: [
            //             {
            //                 _id: '0',
            //                 comment: {
            //                     _id: '3',
            //                     subredditHandle: 'r/pcm',
            //                     comment: 'Shitty comment',
            //                     likes: -100
            //                 },
            //                 reporter: {
            //                     _id: 'some_reporter_id',
            //                     loginUsername: 'reporter_login_username',
            //                     rolesInfo: {
            //                         commenter: {
            //                             shownUsername: 'reporter_username',
            //                             bio: 'bio reporter',
            //                             comments: []
            //                         }
            //                     }
            //                 },
            //                 reportDescription: 'this guy sucks',
            //                 resolved: true,
            //                 reportAccepted: true
            //             }
            //         ]
            //     }
            // }
        };
    }



    async getUserOld(id: string): Promise<User> {
        await sleep(1000);
        return {
            _id: 'test_id',
            loginUsername: 'test_login',
            password: 'pass',
            dateCreated: '2012=01-02',
            profilePublic: true,
            rolesAvailable: ['admin', 'commenter'],
            currentlyloggedIn: 'admin',
            // rolesInfo: {
            //     commenter: {
            //         shownUsername: 'haha',
            //         bio: 'bio haha',
            //         likes: ['0', '1', '2'],
            //         comments: [
            //             {
            //                 _id: '0',
            //                 subredditHandle: 'r/wcgw',
            //                 comment: 'great comment',
            //                 likes: 69
            //             },
            //             {
            //                 _id: '1',
            //                 subredditHandle: 'r/wcgw',
            //                 comment: 'great comment!!!!!!!',
            //                 likes: 1
            //             },
            //         ]
            //     },
            //     admin: {
            //         isSuperAdmin: true,
            //         reportsHandled: [
            //             {
            //                 _id: '0',
            //                 comment: {
            //                     _id: '3',
            //                     subredditHandle: 'r/pcm',
            //                     comment: 'Shitty comment',
            //                     likes: -100
            //                 },
            //                 reporter: {
            //                     _id: 'some_reporter_id',
            //                     loginUsername: 'reporter_login_username',
            //                     rolesInfo: {
            //                         commenter: {
            //                             shownUsername: 'reporter_username',
            //                             bio: 'bio reporter',
            //                             comments: []
            //                         }
            //                     }
            //                 },
            //                 reportDescription: 'this guy sucks',
            //                 resolved: true,
            //                 reportAccepted: true
            //             }
            //         ]
            //     }
            // }
        };
    }




    async login(username: string, password: string) {
        await this.http.post('http://localhost:4000/api/users/login', {username, password}, {withCredentials: true}).toPromise();
        // await sleep(100);
        // await this.http.get<any>('http://localhost:4000/api/users/get_me', {withCredentials: true}).toPromise();
        // await sleep(100);
        // await this.http.get('http://localhost:4000/api/comments/home_comments', {withCredentials: true}).toPromise();
    }

    async logout() {
        return await this.http.post('http://localhost:4000/api/users/logout', {}, {withCredentials: true}).toPromise();
    }

    async register(username: string, password: string) {
        return await this.http.post('http://localhost:4000/api/users/register', {username, password}, {withCredentials: true}).toPromise();
    }

    async get_me(): Promise<User> {

        return await this.http.get<any>('http://localhost:4000/api/users/get_me', {withCredentials: true}).toPromise();
    }

    async get_user(id: string): Promise<User> {
        return await this.http.get<any>('http://localhost:4000/api/users/get_user', {params: new HttpParams().append('id', id), withCredentials: true}).toPromise();
    }

    async update_user(id: string, password: string, profilePublic: boolean, shownUsername: string, bio: string) {
        return await this.http.put('http://localhost:4000/api/users/update_user', {id, password, profilePublic, shownUsername, bio}, {withCredentials: true}).toPromise();
    }

    async elevate_user_admin(id: string) {
        return await this.http.put('http://localhost:4000/api/users/elevate_user_admin', {id}, {withCredentials: true}).toPromise();
    }

    async elevate_user_super_admin(admin_id: string) {
        return await this.http.put('http://localhost:4000/api/users/elevate_user_super_admin', {admin_id}, {withCredentials: true}).toPromise();
    }

    async delete_user(id: string) {
        return await this.http.delete<any>('http://localhost:4000/api/users/delete_user', {params: new HttpParams().append('id', id), withCredentials: true}).toPromise();
    }









}