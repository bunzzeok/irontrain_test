<script setup lang="ts">
import { ComputedRef, computed, onMounted, reactive, ref } from "vue";
import { getFakerData } from "@/assets/api/faker";
import { UserData } from "@/types/faker";
import Row from "@/components/Row.vue";
import { headerList } from "@/assets/ts/common";

// sort 시 비교 해야 될 key list
type CompareKey = "firstname" | "gender" | "phone" | "email" | "birthday";

interface App {
  isLoading: boolean; // 데이터 fetch 로딩
  isSearch: boolean; // 검색 여부

  fakerList: UserData[]; // 불러온 데이터 리스트 (보존 필요)
  filteredFakerList: UserData[]; // 사용 데이터

  searchString: string; // 검색할 단어
  params: { count: number }; // inifinity scroll 에 필요한 number

  sortType: "asc" | "desc" | ""; // sort 시 type
  sortKey: CompareKey; // sort 종류

  getFakerList: () => Promise<void>; // 데이터 가져오는 함수
  handleScroll: (event: Event) => void; // infinity scroll 함수
  searchFaker: () => void; // 검색 함수
  sortFakerList: (key: CompareKey) => void; // 정렬
  showFakerSortInfo: (key: CompareKey) => "↓" | "↑" | ""; // 화면에 sort를 표시할 함수
}

const app = reactive<App>({
  isLoading: false,
  isSearch: false,

  fakerList: [],
  filteredFakerList: [],

  searchString: "",
  params: { count: 0 },

  sortType: "",
  sortKey: "firstname",

  getFakerList: async () => {
    try {
      app.isLoading = true;

      const { data: data }: { data: UserData[] } = await getFakerData(
        app.params.count
      );

      app.isLoading = false;

      app.fakerList = [...app.fakerList, ...data];
      app.filteredFakerList = JSON.parse(JSON.stringify(app.fakerList));
    } catch (err) {
      console.error(err);
    }
  },

  handleScroll: (event: Event) => {
    // 검색 상태거나 sort 상태라면 추가 데이터 요청 제어
    // @Todo 추가 요청 불가능 표시 및 초기화 버튼 필요
    if (app.isSearch) return;
    if (app.sortType !== "") return;

    const target = event.target as HTMLElement;

    // 스크롤의 최상단과, 클라이언트의 높이를 더 한게 스크롤 전체 높이랑 같으면 바닥으로 판단
    const bottom =
      target.scrollHeight === target.scrollTop + target.clientHeight;

    // 바닥이면서 로딩이 아니면 진행
    if (bottom && !app.isLoading) {
      app.params.count += 1;
      app.getFakerList();
    }
  },

  searchFaker: () => {
    // 검색 데이터가 있는 상태에서 호출 시 검색 상태로 보존
    if (app.searchString) app.isSearch = true;
    // 아니라면 검색 상태가 아님 ( 데이터 호출 가능 )
    else app.isSearch = false;

    // 로딩 시엔 호출 불가능
    if (app.isLoading) return;

    // 만약 검색 상태가 아니라면, 최초 불러온 값 복구
    if (!app.isSearch) {
      app.filteredFakerList = app.fakerList;
      return;
    }

    // 아니라면 소문자 기준으로 검색
    app.filteredFakerList = app.fakerList.filter((faker: UserData) => {
      return faker.firstname
        .toLowerCase()
        .includes(app.searchString.toLowerCase());
    });
  },

  sortFakerList: (key: CompareKey) => {
    // sort 를 실행할 key 와 현재 srot 를 진행 중인 키를 비교 하여,
    // 추가적인 키의 상태 변환
    // 내림차순 -> 오름차순 -> 초기화
    if (app.sortKey === key) {
      if (app.sortType === "") app.sortType = "desc";
      else if (app.sortType === "desc") app.sortType = "asc";
      else app.sortType = "";
    } else {
      // 만약 key 가 다르다면, 내림차순 정렬
      app.sortType = "desc";
    }

    // 키 복제
    app.sortKey = key;

    // 반영하지 않는다면 깊은 복사로 초기화
    // 얇은 복사를 진행 시 원본 데이터의 변환이 생김
    if (app.sortType === "") {
      app.filteredFakerList = JSON.parse(JSON.stringify(app.fakerList));
      return;
    }

    // 필터데이터 얇은 복사
    let list: UserData[] = app.filteredFakerList;

    // 정렬
    list = list.sort((aItem, bItem) => {
      if (app.sortType === "desc") return aItem[key].localeCompare(bItem[key]);
      else return bItem[key].localeCompare(aItem[key]);
    });
  },

  // 화면에 나타날 버튼 모양 묶음 처리
  showFakerSortInfo: (key: CompareKey) => {
    if (app.sortType === "") return "";
    if (app.sortKey !== key) return "";

    return app.sortType === "desc" ? "↓" : "↑";
  },
});

onMounted(() => {
  app.getFakerList();
});
</script>

<template>
  <article class="w-full h-full flex items-center justify-center">
    <div
      class="w-full h-[500px] flex flex-col border-b border-solid border-[#E6E8EF] rounded"
    >
      <div
        class="border-b border-solid border-[#E6E8EF] h-[54px] flex items-center gap-2 justify-end px-4 z-[2] bg-white"
      >
        <div class="flex mb-2">
          <p
            class="rounded-tl-md rounded-bl-md relative border border-solid border-[#D7DCE5] flex items-center w-[124px] justify-center"
          >
            Name Search
          </p>

          <input
            v-model="app.searchString"
            @keyup.enter="!app.isLoading && app.searchFaker()"
            type="text"
            class="p-3 border border-solid border-[#D7DCE5] border-l-0 rounded-tr-md rounded-br-md text-sm placeholder:text-[#AFBAC8] w-50"
          />
        </div>

        <button
          @click="app.searchFaker"
          class="flex justify-center items-center bg-[#6B768B] rounded px-3.5 size-[46px] cursor-pointer hover:bg-[#396CF1]"
        >
          <img src="@/assets/imgs/searchButton.png" />
        </button>
      </div>
      <div class="w-full h-[calc(100%-54px)] relative">
        <div
          v-if="app.isLoading"
          class="absolute w-full h-full top-0 left-0 bg-black bg-opacity-70 z-[1] flex"
        >
          <div class="m-auto text-[#aebde3] text-[24px] font-bold">
            Loading...
          </div>
        </div>
        <div
          class="bg-[#F6F7F9] border-b border-solid border-[#E6E8EF] flex items-center h-[54px]"
        >
          <div class="p-3 items-center flex w-[36px]">
            <input type="checkbox" />
          </div>
          <div
            v-for="header in headerList"
            :key="header.title"
            @click="app.sortFakerList(header.value)"
            class="w-[calc((100%-36px)/5)]"
          >
            {{ header.title }}
            {{ app.showFakerSortInfo(header.value) }}
          </div>
        </div>
        <div
          @scroll="app.handleScroll"
          class="overflow-auto relative h-[calc(100%-54px)]"
        >
          <div
            v-if="app.isSearch && app.filteredFakerList.length === 0"
            class="w-full flex items-center justify-center min-h-[40px]"
          >
            not found
          </div>
          <Row
            v-for="faker in app.filteredFakerList"
            :key="faker.phone + faker.email"
            :row="faker"
          />
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped></style>
