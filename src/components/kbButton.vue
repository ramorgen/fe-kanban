<template>
   <button class="w-full rounded-3xl" :class="_class">
      <slot></slot>
   </button>
</template>

<script setup>
   import store from "../store.js"

   const props = defineProps({
      type: "",
   })

   const _class = computed(() => {
      if (props.type == "pl") {
         // primary large
         return "btn-p btn-pl"
      } else if (props.type == "ps") {
         // primary small
         return "btn-p btn-ps"
      } else if (props.type == "sec") {
         return store.lightMode ? "btn-ps btn-sec-light" : "btn-ps btn-sec-dark"
      } else if (props.type == "des") {
         // destructive
         return "btn-ps btn-des"
      }
   })
</script>

<style scoped>
   button {
      font-size: 13px;
      line-height: 26px;
      font-weight: 700;
   }
   .btn-p {
      background-color: #635fc7;
      color: white;
   }
   .btn-p:hover {
      background-color: #a8a4ff;
   }
   .btn-pl {
      padding-top: 15px;
      padding-bottom: 15px;
      font-size: 15px;
      line-height: 19px;
   }
   .btn-ps {
      padding-top: 8px;
      padding-bottom: 8px;
   }
   .btn-des {
      background-color: #ea5555;
      color: white;
   }
   .btn-des:hover {
      background-color: #ff9898;
   }
   .btn-sec-light {
      background-color: rgba(99, 95, 199, 0.1);
      color: #635fc7;
   }
   .btn-sec-light:hover {
      background: rgba(99, 95, 199, 0.25);
   }
   .btn-sec-dark {
      background-color: white;
      color: #635fc7;
   }
   .btn-sec-dark:hover {
      background-color: rgb(203 213 225);
   }
</style>
