import { AxiosResponse } from "axios"
import api from "./api"

const SAVE_CRUSH_EDITOR_URL = "crush_editor/new"

export function saveCrushEditor(value: string): Promise<AxiosResponse<{status: string, crushEditor: string}>>{
  return api.post<{status: string, crushEditor: string}>(SAVE_CRUSH_EDITOR_URL, {crushEditor: {value}})
}