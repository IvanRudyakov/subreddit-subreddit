import { reportsModel } from "../db/reports.js";
import { commentsModel } from "../db/comments.js";

async function get_pending_reports(req, res) {
    res.json(await reportsModel.find({reportAccepted: 'pending'}).populate({
        path: 'comment',
        populate: {
            path: 'commenter',
            populate: {
                path: 'commenter'
            }
        }
    }).populate({
        path: 'reporter',
        populate: {
            path: 'commenter'
        }
    }).limit(20).exec());
}

async function post_report(req, res) {
    const commentId = req.body.commentId;
    const text = req.body.text;
    const currentUser = req.session.currentUser;
    if (currentUser && currentUser.currentlyloggedIn == 'commenter') {
        await reportsModel.create({ comment: commentId, reporter: currentUser._id, reportDescription: text, reportAccepted: 'pending' });
        res.json('ok');
    }
    else {
        res.sendStatus(404);
    }
}

async function accept_report(req, res) {
    const reportId = req.body.reportId;
    const commentId = req.body.commentId
    const currentUser = req.session.currentUser;
    if (currentUser && currentUser.currentlyloggedIn == 'admin') {
        await reportsModel.updateMany({comment: commentId, reportAccepted: 'pending'}, {reportAccepted: 'true'});
        await commentsModel.deleteOne({_id: commentId});
        res.json('ok');
    }
    else {
        res.sendStatus(404);
    }
}

async function reject_report(req, res) {
    const reportId = req.body.reportId;
    const commentId = req.body.commentId
    const currentUser = req.session.currentUser;
    if (currentUser && currentUser.currentlyloggedIn == 'admin') {
        await reportsModel.updateOne({_id: reportId}, {reportAccepted: 'false'});
        res.json('ok');
    }
    else {
        res.sendStatus(404);
    }
}

const reportsController = (app) => {
    app.get('/api/reports/get_reports', get_pending_reports);
    app.post('/api/reports/post_report', post_report);
    app.post('/api/reports/accept_report', accept_report);
    app.post('/api/reports/reject_report', reject_report);
}
export default reportsController;