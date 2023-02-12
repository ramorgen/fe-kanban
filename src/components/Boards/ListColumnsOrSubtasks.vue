<template>
   <div>
      <p class="body-m ml-6 mt-6 md:ml-8 text-kb_medium_grey dark:text-white">
         {{ head }}
      </p>
      <div
         class="ml-6 mr-6 md:ml-8 md:mr-8 mt-2 flex flex-row items-center"
         v-for="(item, index) in items"
         :key="index"
      >
         <kbInput
            ref="itemRefs"
            v-model="item.title"
            :value="item.title"
            class="w-full"
         ></kbInput>

         <SvgClose @click="delColumn(index)" class="ml-4" />
      </div>
      <kbButton
         @click="addColumn()"
         class="ml-6 w-[18.44rem] md:ml-8 md:w-[26rem] mt-6"
         type="sec"
         >+ Add New {{ mode === "board" ? "Column" : "Subtask" }}</kbButton
      >
   </div>
</template>

<script setup>
   // these are the inputs for adding/editing either columns (set via prop mode) or subtasks in case of adding/editing a board or task,
   // used in new_editBoardTask
   import store from "../../store.js"

   const props = defineProps(["data", "mode"])

   let head = props.mode === "board" ? "Columns" : "Subtasks"
   const itemRefs = ref([])

   const items = ref([])
   if (store[props.mode].edit) {
      if (props.mode === "board") {
         props.data.columns.forEach((el) => {
            items.value.push(el)
         })
      } else if (props.mode === "task") {
         props.data.subtasks.forEach((el) => {
            items.value.push(el)
         })
         // todo
      }
   }

   const addColumn = () => {
      if (props.mode === "board") {
         items.value.push({ title: "", tasks: [] })
         props.data.columns = Array.from(items.value)
      } else if (props.mode === "task") {
         items.value.push({ title: "", isCompleted: false })
         props.data.subtasks = Array.from(items.value)
      }
   }
   const delColumn = (idx) => {
      items.value.splice(idx, 1)
      if (props.mode === "board") {
         props.data.columns = Array.from(items.value)
      } else if (props.mode === "task") {
         props.data.subtasks = Array.from(items.value)
      }
   }

   function validate() {
      let ret = true
      items.value.forEach((el, idx) => {
         if (el.title.length === 0) {
            itemRefs.value[idx].isError = true
            ret = false
         }
      })
      return ret
   }

   defineExpose({ validate }) // exposing fucntion for new_editBoardTask
</script>

<style scoped></style>
