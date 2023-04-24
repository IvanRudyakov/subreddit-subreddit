import mongoose from "mongoose";
import { Schema } from "mongoose";

const reportsSchema = new mongoose.Schema({
    comment: { type: Schema.Types.ObjectId, ref: 'Comments' },
    reporter: { type: Schema.Types.ObjectId, ref: 'Users' },
    reportDescription: String,
    reportAccepted: String // 'true', 'false', or 'pending'
    // adminWhoResolved: { type: Schema.Types.ObjectId, ref: 'Users' }
})
const reportsModel = mongoose.model('Reports', reportsSchema);

export { reportsSchema, reportsModel };