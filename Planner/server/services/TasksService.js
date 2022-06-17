import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class TasksService {
  async getAll(query = {}) {
    const tasks = await dbContext.Tasks.find(query).populate('creator', 'name picture');
    return tasks;
  }
  async getById(id) {
    const task = await dbContext.Tasks.findById(id).populate('creator', 'name picture');
    if (task == null) {
      throw new BadRequest('Invalid task id');
    }
    return task;
  }
  async create(body) {
    const task = await dbContext.Tasks.create(body);
    await task.populate('creator', 'name picture');
    return task;
  }

}
export const tasksService = new TasksService();
