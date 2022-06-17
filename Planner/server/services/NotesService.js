import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NotesService {
  async getAll(query = {}) {
    const notes = await dbContext.Notes.find(query).populate('creator', 'name picture');
    return notes;
  }
  async getById(id) {
    const note = await dbContext.Notes.findById(id).populate('creator', 'name picture');
    if (note == null) {
      throw new BadRequest('Invalid note id');
    }
    return note;
  }
  async create(body) {
    const note = await dbContext.Notes.create(body);
    await note.populate('creator', 'name picture');
    return note;
  }

}
export const notesService = new NotesService();
