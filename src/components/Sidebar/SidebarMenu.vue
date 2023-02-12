<template>
   <menu v-if="store.data" class="relative top-4 md:top-[112px]">
      <h4 class="text-kb_medium_grey uppercase ml-8 mb-5">
         All boards ({{ l }})
      </h4>

      <SidebarMenuItems v-for="item in store.data" :key="item.title">
         {{ item.title }}
      </SidebarMenuItems>
      <SidebarMenuItems>
         <span class="text-kb_main_purple">+ Create New Board</span>
      </SidebarMenuItems>
   </menu>
</template>

<script setup>
   import store from "../../store.js"

   const l = computed(() => {
      return store.data.length
   })
</script>

<style scoped></style>
