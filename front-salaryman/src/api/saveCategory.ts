import { CategoryType } from "../types/CategoryType"
import { AxiosResponse } from "axios"
import api from "./api"

const SAVE_TASKS_URL = "category/new"

export function saveCategory(name: string): Promise<AxiosResponse<{status: string, category: CategoryType}>>{
  return api.post<{status: string, category: CategoryType}>(SAVE_TASKS_URL, {category: {name}})
}