import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
import { projectsService } from "./ProjectsService";

class SprintsService {
  async getProjectsSprints(projectId) {
    const sprints = await dbContext.Sprints.find({ projectId: projectId }).populate('creator', 'name picture').populate('project');
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
    await sprint.populate('creator', 'name picture')
    await sprint.populate('project')
    return sprint;
  }
  async delete(userId, sprintId) {
    const toDelete = await this.getById(sprintId)
    const project = await projectsService.getById(toDelete.projectId)
    if (toDelete.creatorId.toString() != userId || project.creatorId.toString() != userId) {
      throw new Forbidden("You cannot delete this sprint")
    }
    await dbContext.Sprints.findByIdAndDelete(sprintId)
  }

}
export const sprintsService = new SprintsService();
