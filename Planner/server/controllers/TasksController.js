import { Auth0Provider } from "@bcwdev/auth0provider";
import { tasksService } from "../services/TasksService";
import BaseController from "../utils/BaseController";

export class TasksController extends BaseController {
  constructor() {
    super('api/projects/:projectId/tasks');
    this.router
      .get('', this.getProjectsTasks)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.delete);
  }
  async getProjectsTasks(req, res, next) {
    try {
      const tasks = await tasksService.getProjectsTasks(req.params.projectId);
      return res.send(tasks);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      const task = await tasksService.getById(req.params.id);
      return res.send(task);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      req.body.projectId = req.params.projectId
      const task = await tasksService.create(req.body);
      return res.send(task);
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      req.body.projectId = req.params.projectId
      req.body.creatorId = req.userInfo.id
      const update = await tasksService.update(req.body, req.params.id)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      const userId = req.userInfo.id
      const taskId = req.params.id
      await tasksService.delete(userId, taskId)
      return res.send("Task Deleted")
    } catch (error) {
      next(error);
    }
  }
}
