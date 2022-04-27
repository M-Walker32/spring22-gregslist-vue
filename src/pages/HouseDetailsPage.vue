<template>
  <div class="row">
    <div v-if="house">
      <div class="col-5">
        <img class="m-2 p-2 img-fluid" :src="house.imgUrl" />
      </div>

      <div class="col-6">
        <h5 class="m-2 p-2">
          Details: <br />
          Price: ${{ house.price }} - Bedrooms: {{ house.bedrooms }} -
          Bathrooms: {{ house.bathrooms }} - Levels:
          {{ house.levels }}
        </h5>
        <p class="m-2 p-2">{{ house.description }}</p>
      </div>
      <!-- edit modal needs to match somewhere ELSE!! -->
      <i
        class="mdi mdi-pencil selectable"
        data-bs-toggle="modal"
        data-bs-target="#edit-modal"
      ></i>
      <i class="mdi mdi-delete selectable" @click="deleteHouse()"></i>
    </div>
    <div v-else>plz</div>
  </div>

  <Modal id="edit-modal">
    <template #modal-title-slot>
      <h3>Edit House!</h3>
    </template>
    <template #modal-body-slot>
      <HouseForm :house="house" />
    </template>
  </Modal>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { AppState } from "../AppState.js";
import { housesService } from "../services/HousesService.js";
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    onMounted(async () => {
      try {
        AppState.house = null;
        await housesService.getHouseById(route.params.id);
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      // delete car
      async deleteHouse() {
        try {
          if (await Pop.confirm()) {
            await housesService.deleteHouse(route.params.id);
            Pop.toast("house delorted", "success");
            router.push({ name: "HousesPage" });
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      house: computed(() => AppState.house),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>