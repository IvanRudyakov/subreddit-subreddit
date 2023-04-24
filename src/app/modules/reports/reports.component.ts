import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Report } from 'src/app/models/report.model';
import { User } from 'src/app/models/user.model';
import { ReportsService } from 'src/app/services/reports.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent {

    isLoading: boolean = true;
    reports: Report[] = [];
    ownUser: User = {currentlyloggedIn: 'anonymous'};

    constructor(private reportsService: ReportsService, private userService: UserService, private router: Router) {}

    ngOnInit() {
        this.getData();
    }

    async getData() {
        this.isLoading = true;
        this.ownUser = await this.userService.get_me();
        this.reports = await this.reportsService.getReports();
        this.isLoading = false;
    }

    accept(report_id: string, comment_id: string) {
        this.reportsService.accept_report(report_id, comment_id);
        this.reports = this.reports.filter(r => r.comment._id != comment_id);
    }

    reject(report_id: string, comment_id: string) {
        this.reportsService.reject_report(report_id, this.reports.find(r => r._id == report_id)?.comment?._id as string);
        this.reports.splice(this.reports.findIndex(r => r._id == report_id), 1);
    }

    gotoUser(user_id: string) {
        this.router.navigate(['app', 'profile', user_id])
    }

}