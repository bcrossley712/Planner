<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10 offset-1 bg-white rounded elevation-3 shadow">
        <div class="row">
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
        <div class="row">
          <div class="col-4"></div>
          <div class="col-4"></div>
          <div class="col-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
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
