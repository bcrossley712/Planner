import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService";
import BaseController from "../utils/BaseController";

export class NotesController extends BaseController {
  constructor() {
    super('api/notes');
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
      const notes = await notesService.getAll(req.query);
      return res.send(notes);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      const note = await notesService.getById(req.params.id);
      return res.send(note);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      const note = await notesService.create(req.body);
      return res.send(note);
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
