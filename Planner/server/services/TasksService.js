import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

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
  async update(update, id) {
    const original = await this.getById(id)
    if (original.creatorId.toString() != update.creatorId) {
      throw new Forbidden('You cannot update this task')
    }
    original.name = update.name ? update.name : original.name
    original.description = update.description ? update.description : original.description
    await original.save()
    await original.populate('creator', 'name picture')
    return original
  }
}
export const tasksService = new TasksService();
