import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProjectsService {
  async getProjects() {
    const res = await api.get('api/projects')
    logger.log('[getProjects]', res.data)
    AppState.projects = res.data
  }
}
export const projectsService = new ProjectsService()
