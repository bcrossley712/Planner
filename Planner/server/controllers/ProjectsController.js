import { Auth0Provider } from "@bcwdev/auth0provider";
import { projectsService } from "../services/ProjectsService";
import BaseController from "../utils/BaseController";

export class ProjectsController extends BaseController {
  constructor() {
    super('api.projects')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.delete)
  }
  async getAll(req, res, next) {
    try {
      const projects = await projectsService.getAll(req.query)
      return res.send(projects)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const project = await projectsService.getById(req.params.id)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await projectsService.create(req.body)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }
  async update(req, res, next) {
    try {
      throw new Error("Method not implemented.");
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      throw new Error("Method not implemented.");
    } catch (error) {
      next(error)
    }
  }
}