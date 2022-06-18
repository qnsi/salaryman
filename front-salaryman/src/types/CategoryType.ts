export type CategoryType = {
  id: number,
  name: string,
  createdAt: string,
  updatedAt: string,
  fields: {
    id: number,
    name: string,
    type: string,
    createdAt: string,
    updatedAt: string,
  }[]
}
