import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService";
import BaseController from "../utils/BaseController";

export class NotesController extends BaseController {
  constructor() {
    super('api/projects/:projectId/notes');
    this.router
      .get('', this.getProjectsNotes)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete);
  }
  async getProjectsNotes(req, res, next) {
    try {
      const notes = await notesService.getProjectsNotes(req.params.projectId);
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
      req.body.projectId = req.params.projectId
      const note = await notesService.create(req.body);
      return res.send(note);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const userId = req.userInfo.id
      const noteId = req.params.id
      await notesService.delete(userId, noteId)
      return res.send('Note Deleted')
    } catch (error) {
      next(error);
    }
  }
}
