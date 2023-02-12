<template>
   <div
      class="relative bg-white dark:bg-kb_dark_grey w-[21.44rem] md:w-[480px] rounded-md"
   >
      <!-- Close button -->

      <SvgClose @click="close()" class="absolute right-2 top-3" />

      <div class="ml-8 mt-8">
         <div class="relative flex flex-row justify-between items-center">
            <h2 class="mr-6 dark:text-white">{{ store.task.show.title }}</h2>

            <div
               @click="toggleMenu"
               class="mr-4 px-4 py-2 bg-transparent cursor-pointer"
            >
               <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#828FA3" fill-rule="evenodd">
                     <circle cx="2.308" cy="2.308" r="2.308" />
                     <circle cx="2.308" cy="10" r="2.308" />
                     <circle cx="2.308" cy="17.692" r="2.308" />
                  </g>
               </svg>
               <EllipsisMenu
                  mode="Task"
                  class="w-[10rem] right-2 md:w-[12rem] mt-4 md:-right-16"
                  ref="ellipsMenu"
               />
            </div>
         </div>
         <div class="mt-6 mr-8">
            <p class="body-l text-kb_medium_grey">
               {{ store.task.show.description }}
            </p>
            <div class="mt-6" v-if="count">
               <p
                  class="text-f12 text-kb_medium_grey dark:text-white font-bold"
               >
                  Subtasks ({{ count }})
               </p>
               <div
                  v-for="(subtask, index) in store.task.show.subtasks"
                  :key="index"
               >
                  <div
                     class="mt-2 flex flex-row items-center bg-kb_light_grey dark:bg-kb_very_dark_grey dark:text-white opacity-50 rounded py-3 text-f12 hover:opacity-100 hover:bg-kb_main_purple_o25 flex-grow"
                  >
                     <input
                        class="ml-2 cursor-pointer"
                        type="checkbox"
                        :id="`check${index}`"
                        v-model="store.task.show.subtasks[index].isCompleted"
                     />
                     <label
                        :for="`check${index}`"
                        class="font-bold ml-4 cursor-pointer"
                        :class="_class(index)"
                     >
                        {{ subtask.title }}
                     </label>
                  </div>
               </div>
            </div>
            <p class="text-f12 text-kb_medium_grey mt-6">Current Status</p>
            <statusSelect @change="statusChanged" class="mt-2 mb-8" />
         </div>
      </div>
   </div>
</template>

<script setup>
   import store from "../../store.js"
   import { onKeyStroke } from "@vueuse/core"
   import EllipsisMenu from "../EllipsisMenu.vue"

   // count subtasks and completed
   let sum, done
   const count = computed(() => {
      ;(sum = 0), (done = 0)
      store.task.show.subtasks.forEach((el) => {
         sum++
         if (el.isCompleted) {
            done++
         }
      })
      if (sum === 0) {
         return 0
      } else {
         return `${done} of ${sum}`
      }
   })

   const ellipsMenu = ref(null)
   const toggleMenu = () => {
      if (ellipsMenu.value) {
         ellipsMenu.value.showMenu = !ellipsMenu.value.showMenu
      }
   }

   // if completed class for this subtask
   const _class = (index) => {
      return store.task.show.subtasks[index].isCompleted
         ? "line-through dark:no-underline"
         : ""
   }

   // event from statusSelect
   const statusChanged = (newStatus) => {
      // newStatus: {title:xxx, index:(index of the NEW status column in data)}

      // splice the task out of the current column and push it to the new column
      store.changeStatus(newStatus.index)

      close()
   }

   const close = () => {
      // reset all relevant members in store
      store.task.active = ""
      store.task.show = undefined
      store.task.status = ""
      store.task.activeIndex = -1
      store.task.columnIndex = -1
      store.mutate = false
   }
   onKeyStroke("Escape", (e) => {
      close()
   })
</script>

<style scoped>
   input[type="checkbox"] {
      accent-color: #635fc7;
   }
</style>
