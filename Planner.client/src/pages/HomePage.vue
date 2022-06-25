<template>
  <div class="container-fluid">
    <div class="row p-5">
      <div
        class="col-10 offset-1 bg-white rounded elevation-3 shadow project-card"
      >
        <div class="row pb-4">
          <div class="col-12 d-flex justify-content-between align-items-center">
            <div class="d-flex flex-column">
              <h-5 class="text-primary fw-bold">Projects</h-5>
              <span>a list of projects for username</span>
            </div>
            <div>
              <button class="btn btn-outline-primary">Create Project</button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4 border-grey border-bottom text-primary">Name</div>
          <div class="col-4 border-grey border-bottom text-primary">
            Members
          </div>
          <div class="col-4 border-grey border-bottom text-primary">
            Started
          </div>
        </div>
        <div
          class="row py-2 selectable align-items-center"
          v-for="p in projects"
          :key="p.id"
        >
          <div class="col-4 fw-bold">{{ p.name }}</div>
          <div class="col-4">
            <img
              class="img-small rounded-circle"
              :src="p.creator?.picture"
              alt="creator image"
            />
          </div>
          <div class="col-4">{{ p.createdAt }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { projectsService } from "../services/ProjectsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
export default {
  setup() {
    onMounted(async () => {
      try {
        await projectsService.getProjects()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }
    )
    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
.img-small {
  height: 50px;
}
.project-card {
  min-height: 80vh;
  padding: 4rem;
}
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
