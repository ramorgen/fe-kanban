<template>
   <div class="h-full">
      <!-- show all columns in the active board: -->
      <div
         v-if="store.getBoardColsLength() > 0"
         class="relative ml-6 flex flex-row gap-6"
      >
         <TaskColumn
            :column="col"
            v-for="(col, index) in cols"
            :colIndex="index"
            :key="index"
         />

         <TaskColumn :index="-1" />
      </div>
      <!-- if no columns in the active board: -->
      <div
         v-if="store.data.length > 0 && store.getBoardColsLength() === 0"
         class="mx-4 text-center h-full grid place-items-center"
      >
         <h3 class="text-kb_medium_grey self-end">
            This board is empty. Create a new column to get started.
         </h3>
         <kbButton
            @click="addColumn"
            type="pl"
            class="w-[174px] self-start mt-8"
            >+ Add New Column</kbButton
         >
      </div>
   </div>
</template>

<script setup>
   import store from "../../store.js"

   const cols = computed(() => {
      return store.getActiveBoard().columns
   })

   const addColumn = () => {
      store.mutate = store.board.edit = true
   }
</script>

<style scoped></style>
