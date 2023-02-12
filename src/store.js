import { reactive, toRaw } from "vue"
import { useWindowSize } from "@vueuse/core"
const { width, height } = useWindowSize()

const store = reactive({
   version: "1.0.00",
   wWidth: width,
   wHeight: height,
   data: null,
   hideAside: false,
   lightMode: true,
   isModal: false,
   mutate: false,
   board: {
      active: "", // name of the active board
      activeIndex: 0,
      add: false,
      edit: false,
      delete: false,
   },
   task: {
      active: "", // name of the active task (in case of edit)
      activeIndex: -1, // index of active task
      columnIndex: -1, // index of column of activeTask
      status: "", // name of the column (when add / edit task) to which the task belongs
      add: false,
      edit: false,
      delete: false,
      show: undefined, // holds the task object, in taskShow
   },

   setData: function (d) {
      this.data = toRaw(d.boards)
      if (JSON.stringify(this.data) != "{}") {
         this.board.active = this.data[0].title
      }
   },

   getActiveBoard: function () {
      if (this.data) {
         return this.data.find((el, index) => {
            if (el.title === this.board.active) {
               this.board.activeIndex = index
               return el
            }
         })
      }
   },
   getActiveColumn: function () {
      if (this.data) {
         return this.getActiveBoard().columns.find((el) => {
            if (el.title === this.task.status) {
               return el
            }
         })
      }
   },

   getActiveTask: function () {
      if (this.data) {
         return this.getActiveColumn().tasks.find((el, idx) => {
            if (el.title === this.task.active) {
               this.task.activeIndex = idx
               return el
            }
         })
      }
   },

   getBoardColsLength: function () {
      if (this.data && this.data.length > 0) {
         return this.getActiveBoard().columns.length
      }
      return 0
   },

   changeStatus: function (colIndex) {
      //  splice task from the old status column

      let task = this.data[this.board.activeIndex].columns[
         this.task.columnIndex
      ].tasks.splice(this.task.activeIndex, 1)

      // push it in the new status column
      this.data[this.board.activeIndex].columns[colIndex].tasks.push(task[0])
   },
})
export default store
