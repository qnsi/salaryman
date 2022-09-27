import { AxiosResponse } from "axios"
import { KanbanCard } from "../../views/Kanban/Kanban"
import api from "../api"

const UPDATE_CARD_URL = "card/update"

export function updateCard(id: number, stage: string): Promise<AxiosResponse<{status: string, card: KanbanCard}>> {
  return api.post<{status: string, card: KanbanCard}>(UPDATE_CARD_URL, {card: {id, stage}})
}