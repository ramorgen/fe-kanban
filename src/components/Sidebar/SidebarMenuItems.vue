<template>
   <a @click="clicked()" href="#" class="item" :class="_class">
      <svg
         class="fill-current"
         width="16"
         height="16"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
            fill=""
         />
      </svg>
      <h3 ref="_slot" class="ml-4">
         <slot></slot>
      </h3>
   </a>
</template>

<script setup>
   import { nextTick } from "vue"
   import store from "../../store.js"

   const _slot = ref("")

   const _class = computed(() => {
      if (_slot.value != "" && _slot.value.textContent === store.board.active) {
         return "!bg-[#635FC7] !text-white"
      } else {
         return "bg-transparent text-[#828FA3]"
      }
   })

   const clicked = () => {
      if (_slot.value.textContent.startsWith("+ Create New Board")) {
         // create new board
         store.mutate = store.board.add = true
         // store.board.active=""
      } else {
         // set active board
         store.board.active = _slot.value.textContent
      }
      // if Mobile:
      store.isModal = false
   }
</script>

<style scoped>
   .item {
      @apply pl-8 py-[14px] flex flex-row items-center w-[15rem]  lg:w-[17.25rem] bg-transparent text-kb_medium_grey active:bg-kb_main_purple
       active:text-white  hover:text-kb_main_purple hover:bg-kb_main_purple_o10 dark:hover:bg-white dark:hover:text-kb_main_purple 
       rounded-r-[6.25rem] cursor-pointer;
   }
</style>
