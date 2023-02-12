<template>
   <div>
      <label :for="id" class="body-m text-kb_medium_grey dark:text-white">
         <slot></slot>
      </label>
      <div class="relative">
         <input
            v-if="controlType !== 'textarea'"
            :id="id"
            class="_input h-10"
            :class="_class"
            :value="modelValue"
            :placeholder="ph"
            @input="inp"
         />
         <textarea
            v-if="controlType === 'textarea'"
            :id="id"
            class="_input"
            rows="5"
            :value="modelValue"
            :placeholder="ph"
            @input="inp"
         ></textarea>
         <div
            v-if="isError"
            class="absolute body-l text-kb_red right-2 top-2 bg-transparent"
         >
            <p>Can't be empty</p>
         </div>
      </div>
   </div>
   <!--  @input="$emit('update:modelValue', $event.target.value)" -->
</template>

<script setup>
   const emit = defineEmits(["update:modelValue"])

   const props = defineProps({
      modelValue: "",
      ph: "",
      controlType: "",
   })

   const id = parseInt(1e6 * Math.random())
   const isError = ref(false)

   const inp = (e) => {
      if (e.target.value !== "") {
         isError.value = false
      }
      emit("update:modelValue", e.target.value)
   }

   const _class = computed(() => {
      if (isError.value) {
         return "!border-kb_red"
      } else {
         return ""
      }
   })

   defineExpose({ isError }) //necessary, so the flag can set by any parent components
</script>

<style scoped>
   ._input {
      border: 1px solid rgba(130, 143, 163, 0.25);
      border-radius: 4px;
      @apply block w-full  mt-2 pl-3 font-medium text-kb_black text-f13 leading-6 dark:text-white dark:bg-kb_dark_grey dark:placeholder:text-white placeholder:opacity-25;
   }
   input:active,
   input:focus {
      outline-style: solid;
      outline-color: #635fc7;
   }

   ::placeholder {
      font-size: 13px;
      color: #000112;
      mix-blend-mode: normal;
      font-weight: 500;
      line-height: 23px;
   }

   .kbInput {
   }
</style>
