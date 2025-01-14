<script setup lang="ts">
import { Address } from "@/types/faker";
import { PropType } from "vue";

const props = defineProps({
  address: {
    type: Object as PropType<Address>,
    default: {},
  },
});
</script>
<template>
  <div class="flex items-center">
    <div class="p-3 items-center flex w-[36px]">→</div>
    <div class="w-full truncate">
      {{
        `${props.address.street}, ${props.address.streetName}, ${props.address.buildingNumber}, ${props.address.city}`
      }}
    </div>
  </div>
  <div></div>
</template>
<style lang="scss"></style>
