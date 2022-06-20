import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const NoteSchema = new Schema({
  body: { type: String, required: true },
  taskId: { type: ObjectId, required: true },
  projectId: { type: ObjectId, required: true },
  creatorId: { type: ObjectId, required: true }
},
  { timestamps: true, toJSON: { virtuals: true } }
)
NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

NoteSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  ref: 'Project',
  justOne: true
})

NoteSchema.virtual('task', {
  localField: 'taskId',
  foreignField: '_id',
  ref: 'Task',
  justOne: true
})