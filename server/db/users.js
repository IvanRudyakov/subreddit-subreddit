import mongoose from "mongoose";
import { Schema } from "mongoose";

const usersSchema = new mongoose.Schema({
    // _id: Schema.Types.ObjectId,
    loginUsername: String,
    password: String,
    dateCreated: String,
    profilePublic: Boolean,
    rolesAvailable: [String],
    commenter: { type: Schema.Types.ObjectId, ref: 'Commenters' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admins' },
});
const usersModel = mongoose.model('Users', usersSchema);

const commentersSchema = new mongoose.Schema({
    // _id: Schema.Types.ObjectId,
    shownUsername: String,
    bio: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'Comments' }]
});
const commentersModel = mongoose.model('Commenters', commentersSchema);

const adminsSchema = new mongoose.Schema({
    // _id: Schema.Types.ObjectId,
    isSuperAdmin: Boolean
});
const adminsModel = mongoose.model('Admins', adminsSchema);

export { usersSchema, usersModel, commentersSchema, commentersModel, adminsSchema, adminsModel };