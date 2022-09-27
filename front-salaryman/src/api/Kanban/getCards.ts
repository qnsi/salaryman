import api from "../api"
import { AxiosResponse } from "axios"
import { KanbanCard } from "../../views/Kanban/Kanban"

const GET_CARDS_URL = "cards"

export function getCardsFromBackend(): Promise<AxiosResponse<{status: string, cards: KanbanCard[]}>>{
  return api.get<{status: string, cards: KanbanCard[]}>(GET_CARDS_URL)
}