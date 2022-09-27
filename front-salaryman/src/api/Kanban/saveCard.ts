import { AxiosResponse } from "axios"
import { KanbanCard } from "../../views/Kanban/Kanban"
import api from "../api"

const SAVE_CARD_URL = "card/new"

export function saveCard(text: string): Promise<AxiosResponse<{status: string, card: KanbanCard}>>{
  return api.post<{status: string, card: KanbanCard}>(SAVE_CARD_URL, {card: {text}})
}