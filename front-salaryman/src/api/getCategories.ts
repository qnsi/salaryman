import api from "./api"
import { AxiosResponse } from "axios"
import { CategoryType } from "../types/CategoryType"

const GET_CATEGORIES_URL = "categories"

export function getCategoriesFromBackend(): Promise<AxiosResponse<{status: string, categories: CategoryType[]}>>{
  return api.get<{status: string, categories: CategoryType[]}>(GET_CATEGORIES_URL)
}


