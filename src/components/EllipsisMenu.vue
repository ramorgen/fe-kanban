<template>
   <div
      ref="menu"
      v-if="showMenu"
      class="absolute z-10 bg-white dark:bg-kb_very_dark_grey rounded-lg shadow-board_menu"
   >
      <a
         @click="_edit"
         class="block ml-4 mt-4 body_l !text-kb_medium_grey hover:!text-kb_very_dark_grey dark:hover:!text-white mr-4"
         href="#"
         >Edit {{ props.mode }}</a
      >
      <a
         @click="_delete"
         class="block ml-4 mt-4 mb-4 mr-4 body_l !text-kb_red hover:!text-kb_red_hover"
         href="#"
         >Delete {{ props.mode }}</a
      >

      <div v-if="props.mode === 'Task'">
         <hr />
         <a
            @click="store.mutate = false"
            class="block ml-4 mt-4 mb-4 body_l !text-kb_medium_grey hover:!text-kb_very_dark_grey dark:hover:!text-white mr-4"
            href="#"
            >Close View</a
         >
      </div>
   </div>
</template>

<script setup>
   import store from "../store.js"

   const props = defineProps(["mode"])

   const showMenu = ref(false)

   const _edit = () => {
      if (props.mode === "Board") {
         store.mutate = store.board.edit = true
      } else if (props.mode === "Task") {
         // remove the taskShow modal, before opening the edit modal
         store.task.show = undefined
         store.task.edit = true
      }
      showMenu.value = false
   }

   const _delete = () => {
      if (props.mode === "Board") {
         store.board.delete = store.mutate = true
      } else if (props.mode === "Task") {
         // remove the taskShow modal, before opening the delete dialog
         store.task.show = undefined
         store.task.delete = true
      }
      showMenu.value = false
   }

   defineExpose({ showMenu })
</script>

<style scoped></style>
