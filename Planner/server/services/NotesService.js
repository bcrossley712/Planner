import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
import { projectsService } from "./ProjectsService";

class NotesService {
  async getProjectsNotes(projectId) {
    const notes = await dbContext.Notes.find({ projectId: projectId }).populate('creator', 'name picture').populate('project').populate('task');
    return notes;
  }
  async getById(id) {
    const note = await dbContext.Notes.findById(id).populate('creator', 'name picture').populate('project').populate('task');
    if (note == null) {
      throw new BadRequest('Invalid note id');
    }
    return note;
  }
  async create(body) {
    const note = await dbContext.Notes.create(body);
    await note.populate('creator', 'name picture');
    await note.populate('project');
    await note.populate('task');
    return note;
  }
  async delete(userId, noteId) {
    const toDelete = await this.getById(noteId)
    const project = await projectsService.getById(toDelete.projectId)
    if (toDelete.creatorId.toString() != userId || project.creatorId.toString() != userId) {
      throw new Forbidden('You cannot delete this note')
    }
    await dbContext.Notes.findByIdAndDelete(noteId)
  }

}
export const notesService = new NotesService();
