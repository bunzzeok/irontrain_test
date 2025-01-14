<script setup lang="ts">
import { PropType, ref, reactive } from "vue";
interface App {
  isTooltip: boolean; // 툴팁 상태
  setIsTooltip: (isTooltip: boolean) => void; // 툴팁을 표시할 함수
}

const textRef = ref<HTMLElement | null>(null);

const props = defineProps({
  text: {
    type: [String, Number] as PropType<string | number>,
    default: "",
  },
});

const app = reactive<App>({
  isTooltip: false,
  setIsTooltip: (isTooltip: boolean) => {
    // ref 로 client 사이즈를 가져옴
    const element = textRef.value;
    // 클라이언트 사이즈와 ... 이 나타날 스크롤 사이즈랑 비교
    if (element && element.scrollWidth > element.clientWidth) {
      if (isTooltip) app.isTooltip = true;
      else app.isTooltip = false;
    }
  },
});
</script>
<template>
  <div class="w-[calc((100%-36px)/5)] px-2 relative">
    <div
      v-if="app.isTooltip"
      class="absolute -top-5 border rounded border-solid border-[#396CF1] bg-white px-3"
    >
      {{ props.text }}
    </div>
    <div
      ref="textRef"
      @mouseover="app.setIsTooltip(true)"
      @mouseleave="app.setIsTooltip(false)"
      class="truncate"
    >
      {{ props.text }}
    </div>
  </div>
</template>
<style lang="scss"></style>
