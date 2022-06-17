import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const SprintSchema = new Schema({
  name: { type: String, required: true },
  projectId: { type: ObjectId, required: true },
  creatorId: { type: ObjectId, required: true },
  isComplete: { type: Boolean, default: false }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

SprintSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
SprintSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})