import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'inner-app',
    templateUrl: './inner-app.component.html'
})
export class InnerAppComponent {

    currentUser: User = { currentlyloggedIn: 'anonymous' };
    currentSearch: string = '';

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.redditTest();
        this.getUser();
    }

    redditTest() {
        const r = new (window as any).snoowrap({
            userAgent: 'subredit-subredit application for web dev class',
            clientId: '2aDKaii5Rpmkqhh3Aye3fw',
            clientSecret: 'lqCofm-qWiQKyzEbHGk_2EKmhiFGVw',
            refreshToken: '610157347701-W-sikyhwUefP64tGbtcSXmABGHKY6w'
        });
        r.searchSubreddits({query: 'programming'}).then(console.log);
    }

    async getUser() {
        this.currentUser = await this.userService.get_me();
    }

    gotoHome() {
        this.router.navigate(['app', 'home']);
    }

    gotoPendingReports() {
        this.router.navigate(['app', 'reports']);
    }

    gotoLogin() {
        this.router.navigate(['login']);
    }

    gotoProfile() {
        this.router.navigate(['app', 'profile', this.currentUser._id]);
    }

    async logout() {
        await this.userService.logout();
        this.router.navigate(['login']);
    }

    search() {
        this.router.navigate(['app', 'search', this.currentSearch]);
    }

}