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