import { adminsModel, commentersModel, usersModel } from "../db/users.js";
import { commentersPublic, usersPublic, adminsPublic } from "./auth-strings.js";


function endsWith(whole, s) {
    return whole.length >= s.length && whole.substr(whole.length - s.length) == s;
}


async function login(req, res) {
    let username = req.body.username;
    let isAdmin = false;
    if (endsWith(username, '-admin')) {
        username = username.substr(0, username.length - '-admin'.length);
        isAdmin = true;
    }

    const password = req.body.password;
    const user = await usersModel.findOne({ loginUsername: username }).populate('commenter').populate('admin');
    if (user && user.password === password) {
        if (user.admin && isAdmin) {
            req.session.currentUser = { ...user._doc, currentlyloggedIn: 'admin' };
        }
        else {
            req.session.currentUser = { ...user._doc, currentlyloggedIn: 'commenter' };
        }
        res.json('ok');
    } else {
        res.sendStatus(404);
    }

}

async function logout(req, res) {
    req.session.destroy();
    res.json('ok');
}

async function register(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const user = await usersModel.findOne({loginUsername: username});
    console.log(user);
    if (user || endsWith(username, '-admin')) {
        res.sendStatus(409);
    }
    else {
        const newCommenter = await commentersModel.create({
            shownUsername: username,
            bio: '',
            likes: []
        });
        const newUser = await usersModel.create({
            loginUsername: username,
            password,
            dateCreated: new Date().toDateString(),
            profilePublic: true,
            rolesAvailable: ['commenter'],
            commenter: newCommenter._id,
            admin: '6444401360e864ad72cc34b7'
        });
        req.session.currentUser = {
            ...newUser._doc, 
            commenter: newCommenter, 
            admin: {_id: '6444401360e864ad72cc34b7', isSuperAdmin: false}, 
            currentlyloggedIn: 'commenter'
        };
        console.log('eruibri');
        console.log(req.session);
        res.json('ok');
    }

}

async function get_me(req, res) {
    console.log(req.session);
    const currentUser = req.session.currentUser;
    if (currentUser) {
        res.json(currentUser);
    }
    else {
        res.json({currentlyloggedIn: 'anonymous'});
    }

}

async function get_user(req, res) {
    const user_id = req.query.id;
    const currentUser = req.session.currentUser;
    let hasFullAccess = false;
    if (user_id == currentUser?._id || currentUser?.currentlyloggedIn === 'admin') {
        hasFullAccess = true;
    }

    let user;
    if (hasFullAccess) {
        user = await usersModel.findById(user_id).populate({
            path: 'commenter'
        }).populate({
            path: 'admin'
        });
    }
    else {
        user = await usersModel.findById(user_id, usersPublic).populate({
            path: 'commenter',
            select: commentersPublic
        }).populate({
            path: 'admin',
            select: adminsPublic
        });
    }



    if (!hasFullAccess && !user.profilePublic) {
        res.json({profilePublic: false});
    }
    else {
        res.json(user);
    }

}

async function update_user(req, res) {
    const id = req.body.id;
    const password = req.body.password;
    const profilePublic = req.body.profilePublic;
    const shownUsername = req.body.shownUsername;
    const bio = req.body.bio;
    const user = await usersModel.findByIdAndUpdate(id, {password, profilePublic});
    await commentersModel.updateOne({_id: user.commenter}, {shownUsername, bio});
    req.session.currentUser.commenter.shownUsername = shownUsername;
    res.json('ok');
    
}

async function elevate_user_admin(req, res) {
    const id = req.body.id;
    const currentUser = req.session.currentUser;
    if (currentUser.currentlyloggedIn == 'admin' && currentUser.admin.isSuperAdmin) {
        const admin = await adminsModel.create({isSuperAdmin: false});
        await usersModel.updateOne({_id: id}, {rolesAvailable: ['commenter', 'admin'], admin: admin._id});
        res.json('ok');
    }
    else {
        res.sendStatus(404);
    }
}

async function elevate_user_super_admin(req, res) {
    const admin_id = req.body.admin_id;
    const currentUser = req.session.currentUser;
    if (currentUser.currentlyloggedIn == 'admin' && currentUser.admin.isSuperAdmin) {
        await adminsModel.updateOne({_id: admin_id}, {isSuperAdmin: true});
        res.json('ok');
    }
    else {
        res.sendStatus(404);
    }
}

async function delete_user(req, res) {
    const user_id = req.query.id;
    if (currentUser.currentlyloggedIn == 'admin') {
        const user = await usersModel.findByIdAndDelete(user_id);
        await commentersModel.deleteOne({_id: user.commenter});
        if (user.rolesAvailable.includes('admin')) {
            await adminsModel.deleteOne({_id: user.admin});
        }
        res.json('ok');
    }
    else {
        res.sendStatus(404);
    }
}

const usersController = (app) => {
    app.post('/api/users/login', login);
    app.post('/api/users/logout', logout);
    app.post('/api/users/register', register);
    app.get('/api/users/get_me', get_me);
    app.get('/api/users/get_user', get_user);
    app.put('/api/users/update_user', update_user);
    app.put('/api/users/elevate_user_admin', elevate_user_admin);
    app.put('/api/users/elevate_user_super_admin', elevate_user_super_admin);
    app.delete('/api/users/delete_user', delete_user);
}
export default usersController;