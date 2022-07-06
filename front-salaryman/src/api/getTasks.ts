import { TaskType, TaskWithAncestors } from "../types/TaskType"
import api from "./api"
import { AxiosResponse } from "axios"

const GET_TASKS_URL = "tasks"
const GET_TASK_URL = "task/"
const GET_DONE_TASKS_URL = "tasks/done"

export function getTasksFromBackend(): Promise<AxiosResponse<{status: string, tasks: TaskType[]}>>{
  return api.get<{status: string, tasks: TaskType[]}>(GET_TASKS_URL)
}

export function getDoneTasksFromBackend(): Promise<AxiosResponse<{status: string, tasks: TaskType[]}>>{
  return api.get<{status: string, tasks: TaskType[]}>(GET_DONE_TASKS_URL)
}

export function getTaskFromBackend(id: number): Promise<AxiosResponse<{status: string, task: TaskWithAncestors}>>{
  return api.get<{status: string, task: TaskWithAncestors}>(GET_TASK_URL+id)
}


