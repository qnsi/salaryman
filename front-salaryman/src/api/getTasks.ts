import { TaskType } from "../types/TaskType"
import api from "./api"
import { AxiosResponse } from "axios"

const GET_TASKS_URL = "tasks"

export function getTasks(): Promise<AxiosResponse<{status: string, tasks: TaskType[]}>>{
  return api.get<{status: string, tasks: TaskType[]}>(GET_TASKS_URL)
}


