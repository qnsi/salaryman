import { TaskType } from "../../../../types/TaskType"
import { moveTaskDown } from "../../helpers/moveTasks"

export function updateTaskIsDone(id: number, setTasks: Function, isDone: boolean) {
  setTasks((state: TaskType[]) => {
    const doneTask = state.find(task => task.id == id) as TaskType
    const parent = state.find(stateTask => stateTask.id == doneTask.parentId)
    var parentId = 0
    if (parent) {
      parentId = parent.id
    }
    var initTasks: TaskType[] = []
    return state.reduce((result, task) => {
      console.log(task)
      console.log(id)
      if (task.id === parentId) {
        result.push({...task, doneChildren: task.doneChildren + 1})
      } else if (task.id !== id) {
        result.push(task)
      } else if (task.id === id && task.parentId === null) {
        task.isDone = true;
        result.push(task)
      }
      return result
    }, initTasks)
  })
}