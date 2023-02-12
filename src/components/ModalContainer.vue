<template>
   <section
      v-if="store.isModal || store.mutate"
      class="absolute inset-0"
      :class="_class"
      style="background-color: rgba(0, 0, 0, 0.5)"
   >
      <!-- <Transition> -->
      <TaskShow v-if="store.task.show" />
      <DeleteBoardOrTask v-if="store.board.delete || store.task.delete" />
      <AddEditBoardOrTask
         v-if="
            store.board.add ||
            store.board.edit ||
            store.task.add ||
            store.task.edit
         "
      />
      <!-- </Transition> -->
   </section>
</template>

<script setup>
   import store from "../store.js"

   const _class = computed(() => {
      return store.mutate ? "grid place-items-center" : ""
   })
</script>

<style scoped></style>
