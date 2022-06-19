import { Auth0Provider } from "@bcwdev/auth0provider";
import { sprintsService } from "../services/SprintsService";
import BaseController from "../utils/BaseController";

export class SprintsController extends BaseController {
  constructor() {
    super('api/projects/:projectId/sprints');
    this.router
      .get('', this.getProjectsSprints)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete);
  }
  async getProjectsSprints(req, res, next) {
    try {
      const sprints = await sprintsService.getProjectsSprints(req.params.projectId);
      return res.send(sprints);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      const sprint = await sprintsService.getById(req.params.id);
      return res.send(sprint);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      req.body.projectId = req.params.projectId
      const sprint = await sprintsService.create(req.body);
      return res.send(sprint);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const userId = req.userInfo.id
      const sprintId = req.params.id
      await sprintsService.delete(userId, sprintId)
      return res.send('Sprint Deleted')
    } catch (error) {
      next(error);
    }
  }
}

