<template>
   <div
      class="relative bg-white dark:bg-kb_dark_grey _border flex flex-row items-center cursor-pointer"
   >
      <!-- Active board name -->
      <p
         class="py-2 ml-4 w-full body_l text-kb_black dark:text-white"
         @click="showMenu = !showMenu"
      >
         {{ selItem }}
      </p>
      <!-- chevron down -->
      <svg
         v-if="!showMenu"
         @click="showMenu = !showMenu"
         class="mr-4"
         width="10"
         height="7"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4" />
      </svg>
      <!-- chevron up -->
      <svg
         v-else
         @click="showMenu = !showMenu"
         class="mr-4"
         width="10"
         height="7"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path stroke="#635FC7" stroke-width="2" fill="none" d="M9 6 5 2 1 6" />
      </svg>
      <!-- show menu -->
      <div
         ref="menu"
         v-if="showMenu"
         class="absolute top-12 z-10 w-full bg-white dark:bg-kb_very_dark_grey rounded-lg shadow-board_menu"
      >
         <a
            @click="clicked"
            class="block ml-4 first:mt-4 last:mb-4 mt-2 body_l text-kb_medium_grey hover:text-kb_dark_grey dark:hover:text-kb_light_grey"
            href="#"
            v-for="item in selectItems"
         >
            {{ item.title }}
         </a>
      </div>
   </div>
</template>

<script setup>
   import store from "../store.js"
   const emit = defineEmits(["change"])

   const props = defineProps(["_mode"])

   const showMenu = ref(false)

   const selectItems = ref([])
   const selItem = ref("")
   onMounted(() => {
      // create the member array for the menu
      let board = store.getActiveBoard()
      board.columns.forEach((element, index) => {
         selectItems.value.push({ title: element.title, index })
      })
      if (props._mode === "new") {
         selItem.value = selectItems.value[0].title
      } else {
         selItem.value = store.task.status
      }
   })

   const clicked = (e) => {
      // title of the selected staus
      selItem.value = e.target.innerHTML
      // find the index in the member array which is the same as in data.columns
      let index
      selectItems.value.forEach((el, idx) => {
         if (el.title === selItem.value) {
            index = idx
         }
      })
      // close menu
      showMenu.value = false
      if (props._mode === "new") {
         // title of selecte item
         store.task.status = selItem.value
      } else {
         // if taskShow: title goes into the current object
         store.task.show.status = selItem.value
      }
      // emit for taskShow: status gets changed: title and index in data.columns
      emit("change", { title: selItem.value, index })
   }
</script>

<style scoped>
   ._border {
      border: 1px solid rgba(130, 143, 163, 0.25);
      border-radius: 4px;
   }
</style>
