import { Auth0Provider } from "@bcwdev/auth0provider";
import { sprintsService } from "../services/SprintsService";
import BaseController from "../utils/BaseController";

export class SprintsController extends BaseController {
  constructor() {
    super('api/sprints');
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.delete);
  }
  async getAll(req, res, next) {
    try {
      const sprints = await sprintsService.getAll(req.query);
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
      const sprint = await sprintsService.create(req.body);
      return res.send(sprint);
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      throw new Error("Method not implemented.");
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      throw new Error("Method not implemented.");
    } catch (error) {
      next(error);
    }
  }
}

