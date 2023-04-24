import { Injectable } from "@angular/core";
import { Report } from "../models/report.model";
import { sleep } from "../utils/utils";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class ReportsService {

    constructor(private http: HttpClient) {}

    async getReportsOld(): Promise<Report[]> {
        await sleep(1000);
        return [
            {
                _id: '0',
                comment: {
                    _id: '3',
                    subredditHandle: 'r/pcm',
                    comment: 'Shitty comment',
                    likes: -100
                },
                reporter: {
                    _id: 'some_reporter_id',
                    loginUsername: 'reporter_login_username',
                    commenter: {
                        shownUsername: 'reporter_username',
                        bio: 'bio reporter'
                    }
                },
                reportDescription: 'this guy sucks',
                reportAccepted: 'true',
            }
        ]
    }

    async getReports(): Promise<Report[]> {
        return await this.http.get<any>('http://localhost:4000/api/reports/get_reports', { withCredentials: true }).toPromise();
    }

    async postReport(commentId: string, text: string) {
        return await this.http.post<any>('http://localhost:4000/api/reports/post_report', {commentId, text}, { withCredentials: true }).toPromise();
    }

    async accept_report(reportId: string, commentId: string) {
        return await this.http.post<any>('http://localhost:4000/api/reports/accept_report', {reportId, commentId}, { withCredentials: true }).toPromise();
    }

    async reject_report(reportId: string, commentId: string) {
        return await this.http.post<any>('http://localhost:4000/api/reports/reject_report', {reportId, commentId}, { withCredentials: true }).toPromise();
    }


}