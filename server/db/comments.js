import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentsSchema = new mongoose.Schema({
    subredditHandle: String,
    comment: String,
    likes: Number,
    commenter: { type: Schema.Types.ObjectId, ref: 'Users' }
})
const commentsModel = mongoose.model('Comments', commentsSchema);

export { commentsSchema, commentsModel };