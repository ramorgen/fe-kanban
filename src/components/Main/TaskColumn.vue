<template>
   <section v-if="props.colIndex >= 0" class="mt-6">
      <div class="mb-6 flex flex-row items-center">
         <div
            v-if="props.colIndex === 0"
            class="w-[15px] h-[15px] bg-[#49C4E5] rounded-full"
         ></div>
         <div
            v-if="props.colIndex === 1"
            class="w-[15px] h-[15px] bg-[#8471F2] rounded-full"
         ></div>
         <div
            v-if="props.colIndex === 2"
            class="w-[15px] h-[15px] bg-[#67E2AE] rounded-full"
         ></div>
         <h4 class="ml-3 uppercase text-kb_medium_grey">
            {{ taskName }} ({{ taskCount }})
         </h4>
      </div>
      <!-- show every task card of this column, enable drag and drop -->
      <draggable
         class="min-w-[200px]"
         v-model="tasks"
         group="cols"
         item-key="s"
         :animation="150"
         @end="dragEnd"
         :data-index="props.colIndex"
         drag-class="drag"
         ghost-class="ghost"
      >
         <template #item="{ element: task, index }">
            <TaskCard @click="showTask(task, index)" class="mb-[20px]">
               <template v-slot:title>{{ task.title }}</template>
               <template v-slot:countSubTasks>{{
                  countSubTasks(task)
               }}</template>
            </TaskCard>
         </template>
      </draggable>
   </section>
   <!-- all columns are displayed now: show as last column this one -->
   <section
      v-else
      @click="addColumn"
      class="newCol mt-16 grid place-items-center cursor-pointer"
   >
      <h1 class="w-[280px] text-center text-kb_medium_grey">+ New Column</h1>
   </section>
</template>

<script setup>
   // called from showMain, shows all columns and tasks of the active board on the main page
   import store from "../../store.js"
   import draggable from "vuedraggable"

   const props = defineProps(["column", "colIndex"])

   const tasks = computed({
      get() {
         return props.column.tasks
      },
      set(newValue) {
         props.column.tasks = newValue
      },
   })

   const countSubTasks = (task) => {
      let count = 0
      task.subtasks.forEach((el) => {
         if (el.isCompleted) {
            count++
         }
      })
      return `${count} of ${task.subtasks.length} subtasks`
   }

   const taskName = computed(() => {
      return props.column.title
   })

   const taskCount = computed(() => {
      return props.column.tasks.length
   })

   const addColumn = () => {
      store.mutate = store.board.edit = true
   }

   // task was clicked, acivate the taskShow modal
   // activation of the modal happens in modalContainer
   const showTask = (task, index) => {
      store.task.active = task.title
      store.task.show = task
      store.task.status = task.status
      store.task.activeIndex = index
      store.task.columnIndex = props.colIndex
      store.mutate = true
   }

   const dragEnd = (e) => {
      let index, title
      index = e.to.getAttribute("data-index")
      title = e.clone.getElementsByTagName("h3")[0].innerText

      let status = store.data[store.board.activeIndex].columns[index].title
      let el = store.data[store.board.activeIndex].columns[index].tasks.forEach(
         (el) => {
            if (el.title == title) {
               el.status = status
            }
         }
      )
      store.task.activeIndex = e.newIndex
   }
</script>

<style scoped>
   .newCol {
      background: linear-gradient(
         180deg,
         #e9effa 0%,
         rgba(233, 239, 250, 0.5) 100%
      );
      border-radius: 6px;
   }
   .drag {
      background-color: rgba(99, 95, 199, 0.95);
      color: white;
   }
   .ghost {
      background-color: rgba(129, 129, 129, 0.3);
      border-radius: 6px;
   }
</style>
