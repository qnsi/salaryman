import { TaskType } from "../types/TaskType"
import { AxiosResponse } from "axios"
import api from "./api"

const DELETE_TASKS_URL = "tasks/delete"

export function deleteTaskFromBackend(id: number): Promise<AxiosResponse<{status: string}>>{
  return api.post<{status: string}>(DELETE_TASKS_URL, {task: {id}})
}
