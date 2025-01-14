<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { getFakerData } from "@/assets/api/faker";
import { ApiResponse, UserData } from "@/types/faker";
import Row from "@/components/Row.vue";
const app = reactive({
  fakerList: [] as UserData[],
  params: {},
});

onMounted(async () => {
  try {
    const { data: data }: { data: UserData[] } = await getFakerData(1);
    app.fakerList = data;
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <article class="w-full h-full">
    <div class="w-full h-full flex flex-col">
      <div
        class="border-b border-solid border-[#E6E8EF] h-[54px] flex items-center gap-2 justify-end mx-4"
      >
        <div class="flex">
          <p
            class="rounded-tl-md rounded-bl-md relative border border-solid border-[#D7DCE5] flex items-center px-3"
          >
            검색
          </p>
          <input
            type="text"
            class="p-3 border border-solid border-[#D7DCE5] border-l-0 rounded-tr-md rounded-br-md text-sm placeholder:text-[#AFBAC8] w-50"
          />
        </div>

        <button
          class="flex justify-center items-center bg-[#6B768B] rounded px-3.5 size-[46px] cursor-pointer hover:bg-[#396CF1]"
        >
          <img src="@/assets/imgs/searchButton.png" />
        </button>
      </div>
      <div class="w-full h-[calc(100%-54px)] overflow-auto">
        <div
          class="bg-[#F6F7F9] border-b border-solid border-[#E6E8EF] flex items-center"
        >
          <div class="p-3 items-center flex">
            <input type="checkbox" />
          </div>
          <div>name</div>
          <div>gender</div>
          <div>phone</div>
          <div>email</div>
          <div>birthday</div>
        </div>
        <div>
          <Row />
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped></style>
