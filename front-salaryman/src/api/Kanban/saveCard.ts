import { AxiosResponse } from "axios"
import api from "../api"

const SAVE_CARD_URL = "card/new"

export function saveCard(text: string): Promise<AxiosResponse<{status: string, card: {id: number, text: string}}>>{
  return api.post<{status: string, card: {id: number, text: string}}>(SAVE_CARD_URL, {card: {text}})
}