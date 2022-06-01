import { TaskType } from "../types/TaskType"
import { AxiosResponse } from "axios"
import api from "./api"

const SAVE_TASKS_URL = "tasks/new"

export function saveTask(text: string, order: number, parentId: number): Promise<AxiosResponse<{status: string, task: TaskType}>>{
  return api.post<{status: string, task: TaskType}>(SAVE_TASKS_URL, {task: {text, order, parentId}})
}