import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class ProjectsService {
  async getAll(query = {}) {
    const projects = await dbContext.Projects.find(query).populate('creator', 'name picture')
    return projects
  }
  async getById(id) {
    const project = await dbContext.Projects.findById(id).populate('creator', 'name picture')
    if (project == null) {
      throw new BadRequest('Invalid project id')
    }
    return project
  }
  async create(body) {
    const project = await dbContext.Projects.create(body)
    await project.populate('creator', 'name picture')
    return project
  }

}
export const projectsService = new ProjectsService()

