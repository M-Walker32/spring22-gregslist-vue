<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2"></div>
      <div class="row">
        <h1>This is the houses page</h1>
        <House v-for="h in houses" :key="h.id" :house="h" />
      </div>
    </div>
  </div>

  <Modal id="create-modal">
    <template #modal-title-slot>
      <h3>Create a house!</h3>
    </template>
    <template #modal-body-slot>
      <HouseForm />
    </template>
  </Modal>
</template>


<script>
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { housesService } from "../services/HousesService.js";
import { computed, onMounted } from "@vue/runtime-core";
import { AppState } from "../AppState.js";

export default {
  setup() {
    onMounted(async () => {
      try {
        await housesService.getHouses();
        logger.log("controllers working");
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return { houses: computed(() => AppState.houses) };
  },
};
</script>


<style lang="scss" scoped>
</style>