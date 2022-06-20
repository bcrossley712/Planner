import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const TaskSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  projectId: { type: ObjectId, required: true },
  sprintId: { type: ObjectId, required: true },
  creatorId: { type: ObjectId, required: true },
  isComplete: { type: Boolean, default: false },
  completedOn: { type: Date },
  assignedTo: { type: ObjectId }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

TaskSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

TaskSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  ref: 'Project',
  justOne: true
})

TaskSchema.virtual('sprint', {
  localField: 'sprintId',
  foreignField: '_id',
  ref: 'Sprint',
  justOne: true
})