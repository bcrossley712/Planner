import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class SprintsService {
  async getAll(query = {}) {
    const sprints = await dbContext.Sprints.find(query).populate('creator', 'name picture').populate('project');
    return sprints;
  }
  async getById(id) {
    const sprint = await dbContext.Sprints.findById(id).populate('creator', 'name picture').populate('project');
    if (sprint == null) {
      throw new BadRequest('Invalid sprint id');
    }
    return sprint;
  }
  async create(body) {
    const sprint = await dbContext.Sprints.create(body);
    await sprint.populate('creator', 'name picture').populate('project');
    return sprint;
  }

}
export const sprintsService = new SprintsService();
