<template>
  <form @submit.prevent="handleSubmit()">
    <div class="form-group">
      <label for="bedrooms" class="form-label">Bedrooms:</label>
      <input
        type="number"
        class="form-control"
        id="bedrooms"
        v-model="editable.bedrooms"
      />
    </div>
    <div class="form-group">
      <label for="bathrooms" class="form-label">Bathrooms:</label>
      <input
        type="Number"
        class="form-control"
        id="bathrooms"
        v-model="editable.bathrooms"
      />
    </div>
    <div class="form-group">
      <label for="levels" class="form-label">Levels:</label>
      <input
        type="Number"
        class="form-control"
        id="levels"
        v-model="editable.levels"
      />
    </div>

    <div class="form-group">
      <label for="price" class="form-label">Price:</label>
      <input
        type="number"
        class="form-control"
        id="price"
        v-model="editable.price"
      />
    </div>

    <div class="form-group">
      <label for="year" class="form-label">Year:</label>
      <input
        type="Number"
        class="form-control"
        id="year"
        v-model="editable.year"
      />
    </div>
    <div class="form-group">
      <label for="img" class="form-label">Img:</label>
      <input
        type="text"
        class="form-control"
        id="img"
        v-model="editable.imgUrl"
      />
    </div>

    <div class="form-group">
      <label for="description" class="form-label">Description:</label>
      <textarea
        type="text"
        class="form-control"
        id="description"
        v-model="editable.description"
      />
    </div>
    <button type="submit" class="btn btn-primary mt-3">Submit</button>
  </form>
</template>


<script>
import { handleError, ref, watchEffect } from "@vue/runtime-core";
import { House } from "../models/House.js";
import { housesService } from "../services/HousesService.js";
import Pop from "../utils/Pop.js";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";
import { logger } from "../utils/Logger.js";
export default {
  props: {
    house: {
      type: House,
      default: () => new House(),
    },
  },
  setup(props) {
    const router = useRouter();
    const editable = ref({});
    watchEffect(() => {
      editable.value = { ...props.house };
    });
    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await housesService.editHouse(editable.value);
            Pop.toast("House has been edited!", "success");
            // close modal here
          } else {
            const createdHouse = await housesService.createHouse(
              editable.value
            );
            logger.log(createdHouse);
            router.push({
              name: "HouseDetailsPage",
              params: { id: createdHouse.id },
            });
            Pop.toast("House created!", "success");
            // close modal here
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>