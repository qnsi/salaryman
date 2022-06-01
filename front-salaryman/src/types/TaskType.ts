export type TaskType = {
  id: number,
  isDone: boolean, 
  order: number,
  intendation: number,
  parentId: number,
  doneChildren: number,
  text: string,
  createdAt: string,
  updatedAt: string,
  collapsed: boolean,
  hidden: boolean,
}
