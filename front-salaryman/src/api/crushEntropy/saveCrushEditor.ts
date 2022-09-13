import { AxiosResponse } from "axios"
import api from "../api"

const SAVE_CRUSH_EDITOR_URL = "crush_editor/new"

export function saveCrushEditor(value: string, day: string): Promise<AxiosResponse<{status: string, crushEditor: {value: string, day: string}}>>{
  return api.post<{status: string, crushEditor: { value: string, day: string}}>(SAVE_CRUSH_EDITOR_URL, {crushEditor: {value, day}})
}