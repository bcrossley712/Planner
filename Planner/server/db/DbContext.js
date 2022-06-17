import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { NoteSchema } from "../models/Note";
import { ProjectSchema } from "../models/Project";
import { SprintSchema } from "../models/Sprint";
import { TaskSchema } from "../models/Task";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Projects = mongoose.model('Project', ProjectSchema);
  Tasks = mongoose.model('Task', TaskSchema);
  Notes = mongoose.model('Note', NoteSchema);
  Sprints = mongoose.model('Sprint', SprintSchema);
}

export const dbContext = new DbContext()
