import { commentsModel } from "../db/comments.js";
import { reportsModel } from "../db/reports.js";
import { commentersModel } from "../db/users.js";

async function get_home_comments(req, res) {
    res.json(await commentsModel.find().populate({
        path: 'commenter',
        populate: {
            path: 'commenter'
        }
    }).limit(20).exec());
}

async function get_subreddit_comments(req, res) {
    const subredditHandle = req.query.handle;
    res.json(await commentsModel.find({subredditHandle: subredditHandle}).populate({
        path: 'commenter',
        populate: {
            path: 'commenter'
        }
    }).exec());
}

async function post_comment(req, res) {
    const handle = req.body.handle;
    const text = req.body.text;
    const currentUser = req.session.currentUser;
    console.log('user: ');
    console.log(currentUser)
    if (currentUser && currentUser.currentlyloggedIn == 'commenter') {
        const newComment = await commentsModel.create({subredditHandle: handle, comment: text, likes: 0, commenter: currentUser._id});
        res.json(newComment);
    }
    else {
        res.sendStatus(404);
    }
}

async function edit_comment(req, res) {
    const id = req.body.id;
    const text = req.body.text;
    const currentUser = req.session.currentUser;
    if (currentUser) {
        await commentsModel.updateOne({_id: id}, {comment: text});
        res.json('ok');
    }
    else {
        res.sendStatus(404);
    }
}

async function delete_comment(req, res) {
    const id = req.query.id;
    const currentUser = req.session.currentUser;
    if (currentUser) {
        await commentsModel.deleteOne({_id: id});
        await reportsModel.deleteMany({ comment: id });
        res.json('ok');
    }
    else {
        res.sendStatus(404);
    }
}

async function updateLike(req, res) {
    const comment_id = req.body.comment_id;
    const like = req.body.like; // either 'like', 'unlike', or 'none'
    const newLikeCounter = req.body.newLikeCounter;
    const currentUser = req.session.currentUser;
    const likesWithoutComment = currentUser.commenter.likes.filter(id => id !== comment_id);
    const dislikesWithoutComment = currentUser.commenter.dislikes.filter(id => id !== comment_id);
    if (currentUser) {
        const newLikes = [...likesWithoutComment, ...(like === 'like' ? [comment_id] : [])];
        const newDislikes = [...dislikesWithoutComment, ...(like === 'dislike' ? [comment_id] : [])];
        console.log('likes');
        console.log(newLikes);
        await commentersModel.updateOne({_id: currentUser.commenter._id}, {
            likes: newLikes,
            dislikes: newDislikes,
        });
        await commentsModel.updateOne({_id: comment_id}, {likes: newLikeCounter});
        req.session.currentUser.commenter.likes = newLikes;
        req.session.currentUser.commenter.dislikes = newDislikes;
        res.json('ok');
    }
    else {
        res.sendStatus(404);
    }
}

const commentsController = (app) => {
    app.get('/api/comments/home_comments', get_home_comments);
    app.get('/api/comments/subreddit_comments', get_subreddit_comments);
    app.post('/api/comments/post_comment', post_comment);
    app.put('/api/comments/edit_comment', edit_comment);
    app.delete('/api/comments/delete_comment', delete_comment);
    app.put('/api/comments/updateLike', updateLike);
}
export default commentsController;