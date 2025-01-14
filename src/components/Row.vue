<script setup lang="ts">
import { UserData } from "@/types/faker";
import { PropType, reactive } from "vue";
import AddRessRow from "@/components/AddressRow.vue";
import Column from "@/components/Column.vue";
import { headerList } from "@/assets/ts/common";

interface App {
  isOpenedAddress: boolean; // 주소 표시 조건
  openAddress: () => void; // 주소를 표시할 함수
}

const props = defineProps({
  row: {
    type: Object as PropType<UserData>,
    default: {},
  },
});

const app = reactive<App>({
  isOpenedAddress: false,
  openAddress: () => {
    app.isOpenedAddress = !app.isOpenedAddress;
  },
});
</script>
<template>
  <div class="w-full min-h-[40px] border-b border-solid border-[#E6E8EF]">
    <div @click="app.openAddress" class="flex items-center cursor-pointer">
      <div class="p-3 items-center flex w-[36px]">
        <input type="checkbox" />
      </div>
      <Column
        v-for="header in headerList"
        :key="header.title"
        :text="props.row[header.value]"
      />
    </div>
    <div v-show="app.isOpenedAddress">
      <AddRessRow :address="row.address" />
    </div>
  </div>
</template>
<style lang="scss"></style>
