<template>
   <section
      class="w-[21.44rem] md:w-[30rem] bg-white dark:bg-kb_dark_grey rounded-md"
   >
      <!-- head -->
      <div class="flex flex-row justify-between items-center">
         <h2 class="ml-6 md:ml-8 mt-8 dark:text-white">
            {{ head }}
         </h2>
         <!-- Close button -->
         <SvgClose @click="close()" class="mr-6" />
      </div>
      <!-- end head -->

      <!-- Name / Title -->
      <kbInput
         :ref="
            (el) => {
               inputRefs(el, -1)
            }
         "
         v-model="workData.title"
         :value="workData.title"
         :ph="ph"
         class="ml-6 mr-6 md:ml-8 md:mr-8 mt-6"
         >{{ label }}</kbInput
      >
      <!-- end name -->

      <!-- in case of task: description -->
      <kbInput
         v-if="mode === 'task'"
         :ref="
            (el) => {
               inputRefs(el, -2)
            }
         "
         v-model="vmDescription"
         :value="vmDescription"
         controlType="textarea"
         ph="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
         class="mb-8 ml-6 mr-6 md:ml-8 md:mr-8 mt-6"
         >{{ store.task.edit ? "Task" : "" }} Description</kbInput
      >

      <!-- inputs for either columns or subtasks   -->
      <ListColumnsOrSubtasks ref="col_sub" :data="workData" :mode="mode" />

      <p
         v-if="mode === 'task'"
         class="ml-8 mt-6 mb-2 text-kb_medium_grey text-f12 font-bold"
      >
         {{ statusCaption }}
      </p>
      <statusSelect
         :_mode="statusMode"
         class="ml-8 mr-6 md:mr-8"
         v-if="mode === 'task'"
      ></statusSelect>

      <kbButton
         @click="saveBoard()"
         class="ml-6 w-[18.44rem] md:ml-8 md:w-[26rem] mt-6 mb-8"
         type="ps"
         >{{ saveCaption }}</kbButton
      >
   </section>
</template>

<script setup>
   import { ref } from "vue"
   import store from "../../store.js"
   import { onKeyStroke } from "@vueuse/core"

   const workData = ref()
   const vmTitle = ref("")
   const vmDescription = ref("")
   const validation = ref(false)
   const col_sub = ref(null)

   let head, ph, label, mode, saveCaption, statusCaption, statusMode
   if (store.board.add || store.board.edit) {
      head = (store.board.edit ? "Edit" : "Add New") + " Board"
      ph = "e.g. Web Design"
      label = (store.board.edit ? "Board " : "") + "Name"
      saveCaption = store.board.add ? "Create New Board" : "Save Changes"
      mode = "board"
      workData.value = { title: "", columns: [] }
      if (store.board.edit) {
         workData.value = JSON.parse(
            JSON.stringify(toRaw(store.getActiveBoard()))
         )
         vmTitle.value = workData.value.title
      }
   } else if (store.task.add || store.task.edit) {
      head = (store.task.edit ? "Edit" : "Add New") + " Task"
      ph = "e.g. Take coffee break"
      label = (store.task.edit ? "Task " : "") + "Name"
      saveCaption = store.task.add ? "Create Task" : "Save Changes"
      mode = "task"
      statusCaption = (store.task.add ? "" : "Current ") + "Status"
      statusMode = store.task.add ? "new" : "edit"
      workData.value = { title: "", description: "", status: "", subtasks: [] }
      if (store.task.edit) {
         workData.value = JSON.parse(
            JSON.stringify(toRaw(store.getActiveTask()))
         )
         vmTitle.value = workData.value.title
         vmDescription.value = workData.value.description
      }
   }

   const close = () => {
      store.mutate = false
      store.task.status = ""
      store.task.add =
         store.task.edit =
         store.board.add =
         store.board.edit =
            false // flags for modalContainer
   }

   const saveBoard = () => {
      validation.value = true // validation flag for inputRefs()
      if (!col_sub.value.validate()) {
         // validation of columns/subtasks in columns_subtask
         return
      }
      if (workData.value.title !== "") {
         if (mode === "board") {
            if (store.board.add) {
               store.data.push(workData.value)
               store.board.active = workData.value.title
            } else if (store.board.edit) {
               store.board.active = workData.value.title
               store.data[store.board.activeIndex] = workData.value
            }
         } else if (mode === "task") {
            if (store.task.add) {
               store.getActiveColumn().tasks.push({
                  title: workData.value.title,
                  description: vmDescription.value,
                  status: store.task.status,
                  subtasks: workData.value.subtasks,
               })
            } else if (store.task.edit) {
               store.data[store.board.activeIndex].columns[
                  store.task.columnIndex
               ].tasks[store.task.activeIndex] = workData.value
            }
         }
         close()
      }
   }

   function inputRefs(el, index) {
      if (el === null) {
         return
      }
      if (workData.value.title.length === 0) {
         if (validation.value && index === -1) {
            el.isError = true
         }
      } else {
         el.isError = false // with the first entered character isError gets reset
      }
   }

   onKeyStroke("Escape", (e) => {
      close()
   })
</script>

<style scoped></style>
