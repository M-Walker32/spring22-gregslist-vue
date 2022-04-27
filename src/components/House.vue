<template>
  <div class="col-4">
    <router-link :to="{ name: 'HouseDetailsPage', params: { id: house.id } }">
      <div class="card m-2 mt-3">
        <img :src="house.imgUrl" />
        <h4 class="p-3">
          Bedrooms: {{ house.bedrooms }} Bathrooms:{{ house.bathrooms }}
        </h4>
      </div>
    </router-link>
  </div>
</template>


<script>
import { House } from "../models/House.js";
export default {
  props: {
    house: {
      type: House,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>