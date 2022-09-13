import api from "./../api"
import { AxiosResponse } from "axios"

const GET_CRUSH_EDITOR_URL = "crush_editor/"

export function getCrushEditorStateFromBackend(day: string): Promise<AxiosResponse<{status: string, crushEditor: {value: string, day: string}}>>{
  return api.get<{status: string, crushEditor: {value: string, day: string}}>(GET_CRUSH_EDITOR_URL+day)
}