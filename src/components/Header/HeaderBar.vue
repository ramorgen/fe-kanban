<template>
   <div
      class="relative flex flex-row justify-between items-center h-full ml-14 md:ml-6"
   >
      <!-- Desktop/Tablet: Active board name -->
      <div v-if="store.wWidth > 767">
         <h1 class="dark:text-white">
            {{ store.board.active }}
         </h1>
      </div>
      <!-- Mobile: -->
      <div v-else>
         <div class="flex flex-row items-center cursor-pointer">
            <!-- Active board name -->
            <h2
               v-if="store.data.length > 0"
               class="mr-2 dark:text-white"
               @click="store.isModal = true"
            >
               {{ store.board.active }}
            </h2>
            <h2
               v-else
               class="mr-2 dark:text-white"
               @click="store.mutate = store.board.add = true"
            >
               + Create New Board
            </h2>
            <!-- chevron down -->
            <svg
               v-if="!store.isModal"
               width="10"
               height="7"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  stroke="#635FC7"
                  stroke-width="2"
                  fill="none"
                  d="m1 1 4 4 4-4"
               />
            </svg>
            <!-- chevron up -->
            <svg
               v-else
               width="10"
               height="7"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  stroke="#635FC7"
                  stroke-width="2"
                  fill="none"
                  d="M9 6 5 2 1 6"
               />
            </svg>
         </div>
         <!-- The mobile menu -->
         <div v-if="store.isModal">
            <div
               class="absolute w-[16.5rem] h-[20.13rem] rounded-lg z-10 top-20 bg-white dark:bg-kb_dark_grey"
            >
               <div
                  @click="store.isModal = false"
                  class="z-20 px-1 py-1 absolute cursor-pointer right-3 top-3"
               >
                  <SvgClose />
               </div>
               <SidebarMenu />
               <DarkLightModeSwitch />
            </div>
         </div>
      </div>
      <!-- End mobile -->

      <!-- The button -->
      <div
         class="mr-3 md:mr-7 w-[12.06 rem] flex flex-row justify-between items-center"
      >
         <div v-if="store.wWidth > 767">
            <h3
               @click="addTask"
               :class="_class"
               class="flex flex-row items-center justify-center w-[10.25rem] h-12 rounded-3xl text-white cursor-pointer"
            >
               + Add New Task
            </h3>
         </div>
         <!-- Mobile: -->
         <div v-else>
            <h3
               @click="addTask"
               :class="_class"
               class="flex flex-row items-center justify-center w-12 h-8 rounded-3xl text-white"
            >
               +
            </h3>
         </div>
         <!-- End mobile -->
         <!-- Vertical ellipsis -->
         <svg
            @click="toggleMenu()"
            class="relative ml-4 md:ml-6 cursor-pointer pl-0.5 hover:bg-kb_light_grey"
            width="14"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
         >
            <g fill="#828FA3" fill-rule="evenodd">
               <circle cx="2.308" cy="2.308" r="2.308" />
               <circle cx="2.308" cy="10" r="2.308" />
               <circle cx="2.308" cy="17.692" r="2.308" />
            </g>
         </svg>

         <EllipsisMenu
            mode="Board"
            class="right-3 top-[3.75rem] md:right-8 md:top-[4.6rem] lg:top-[5.2rem] w-[12rem]"
            ref="ellipsMenu"
         />
      </div>
   </div>
</template>

<script setup>
   import store from "../../store.js"
   import EllipsisMenu from "../EllipsisMenu.vue"

   // ref for ellipsisMenu
   const ellipsMenu = ref(null)
   const toggleMenu = () => {
      ellipsMenu.value.showMenu = !ellipsMenu.value.showMenu
   }
   const _class = computed(() => {
      return store.getBoardColsLength() > 0
         ? "cursor-pointer bg-kb_main_purple hover:bg-kb_main_purple_hover"
         : "cursor-default bg-kb_main_purple_o25"
   })

   const addTask = () => {
      store.task.status = store.getActiveBoard().columns[0].title // initial always the first column
      store.mutate = store.task.add = true
   }
</script>

<style scoped></style>
