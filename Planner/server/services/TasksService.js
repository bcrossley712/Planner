import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
import { projectsService } from "./ProjectsService";

class TasksService {
  async getProjectsTasks(projectId) {
    const tasks = await dbContext.Tasks.find({ projectId: projectId }).populate('creator', 'name picture').populate('project').populate('sprint');
    return tasks;
  }
  async getById(id) {
    const task = await dbContext.Tasks.findById(id).populate('creator', 'name picture').populate('project').populate('sprint');
    if (task == null) {
      throw new BadRequest('Invalid task id');
    }
    return task;
  }
  async create(body) {
    const task = await dbContext.Tasks.create(body);
    await task.populate('creator', 'name picture');
    await task.populate('project');
    await task.populate('sprint');
    return task;
  }
  async update(update, id) {
    const original = await this.getById(id)
    if (original.creatorId.toString() != update.creatorId) {
      throw new Forbidden('You cannot update this task')
    }
    original.name = update.name ? update.name : original.name
    original.weight = update.weight >= 0 ? update.weight : original.weight
    original.sprintId = update.sprintId ? update.sprintId : original.sprintId
    original.isComplete = update.isComplete != null ? update.isComplete : original.isComplete
    original.assignedTo = update.assignedTo ? update.assignedTo : original.assignedTo
    original.completedOn = update.completedOn ? update.completedOn : original.completedOn
    await original.save()
    await original.populate('creator', 'name picture')
    await original.populate('project')
    await original.populate('sprint')
    return original
  }
  async delete(userId, taskId) {
    const toDelete = await this.getById(taskId)
    const project = await projectsService.getById(toDelete.projectId)
    if (toDelete.creatorId.toString() != userId || project.creatorId.toString() != userId) {
      throw new Forbidden('You cannot delete this task')
    }
    await dbContext.Tasks.findByIdAndDelete(taskId)
  }
}
export const tasksService = new TasksService();
