import { TaskType } from "../types/TaskType"
import { AxiosResponse } from "axios"
import api from "./api"

const UPDATE_TASKS_URL = "tasks"

export function markTaskAsCollapsed(id: number, collapsed: boolean): Promise<AxiosResponse<{status: string}>>{
  return api.put<{status: string}>(UPDATE_TASKS_URL, {task: {id, collapsed}})
}

export function markTaskAsDoneInBackend(id: number, isDone: boolean): Promise<AxiosResponse<{status: string}>>{
  return api.put<{status: string}>(UPDATE_TASKS_URL, {task: {id, isDone}})
}

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
      if (task.id === parentId) {
        result.push({...task, doneChildren: task.doneChildren + 1})
      } else if (task.id !== id) {
        result.push(task)
      }
      return result
    }, initTasks)
  })
}