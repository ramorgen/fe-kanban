<template>
   <div
      class="mt-4 w-[21.44rem] md:w-[30rem] px-6 md:px-8 bg-white dark:bg-kb_dark_grey rounded-md"
   >
      <h1 class="text-kb_red mb-6 pt-6 md:pt-8">Delete this {{ mode }}?</h1>
      <p class="body-l text-kb_medium_grey">{{ question }}</p>
      <div class="mt-6 mb-10 flex flex-col md:flex-row">
         <kbButton @click="_delete()" type="des">Delete</kbButton>
         <kbButton @click="close()" class="mt-4 md:ml-4 md:mt-0" type="sec"
            >Cancel</kbButton
         >
      </div>
   </div>
</template>

<script setup>
   import store from "../../store.js"
   import { onKeyStroke } from "@vueuse/core"

   const mode = computed(() => {
      return store.board.delete ? "Board" : "Task"
   })
   const question = computed(() => {
      let ret = "Are you sure you want to delete the "
      ret += store.board.delete
         ? `'${store.board.active}' board?`
         : `'${store.task.active}' task and its subtasks?`
      ret += store.board.delete
         ? " This action will remove all columns and tasks and cannot be reversed."
         : " This action cannot be reversed."
      return ret
   })

   const close = () => {
      if (mode.value === "Board") {
         store.mutate = store.board.delete = false
      } else if (mode.value === "Task") {
         store.mutate = store.task.delete = false
      }
   }

   const _delete = () => {
      if (store.board.delete) {
         store.data.splice(store.board.activeIndex, 1)
         if (store.data.length > 0) {
            // any boards left?
            store.board.active = store.data[0].title
         } else {
            store.board.active = ""
         }
         store.board.activeIndex = 0
      } else if (store.task.delete) {
         store.data[store.board.activeIndex].columns[
            store.task.columnIndex
         ].tasks.splice(store.task.activeIndex, 1)
         store.task.active = ""
         store.task.show = undefined
         store.task.activeIndex = -1
      }
      store.mutate = false
      close()
   }

   onKeyStroke("Escape", (e) => {
      close()
   })
</script>

<style scoped></style>
