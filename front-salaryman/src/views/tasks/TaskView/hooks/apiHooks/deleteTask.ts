import { deleteTaskFromBackend } from "../../../../../api/deleteTask"
import { TaskType } from "../../../../../types/TaskType"
import { moveFocusUp } from "../useKeyboardShortcuts"

export async function deleteTask(id: number, tasks: TaskType[], setTasks: Function, setFocusedTaskId: Function) {
  const response = await deleteTaskFromBackend(id)
  handleDeleteResponse(response.data, id, tasks, setTasks)
  moveFocusUp(tasks, id, setFocusedTaskId)
}

function handleDeleteResponse(response: {status: string}, id: number, tasks: TaskType[], setTasks: Function) {
  if (response.status === "ok") {
    deleteTaskFromState(id, setTasks, tasks)
  } else {
    displayGetErrorIfResponseError()
  }
}

function deleteTaskFromState(id: number, setTasks: Function, tasks: TaskType[]) {
  deleteDescendentsFromState(id, setTasks, tasks)
  setTasks((state: TaskType[]) => {
    return state.filter((task) => task.id !== id)
  })
}

function deleteDescendentsFromState(parentId: number, setTasks: Function, tasks: TaskType[]) {
  const children = tasks.filter(task => task.parentId == parentId)
  if (children.length > 0) {
    for (const child of children) {
      deleteDescendentsFromState(child.id, setTasks, tasks)
    }
    setTasks((state: TaskType[]) => {
      const childrenIds = children.map((task) => task.id)
      return state.filter((task) => !childrenIds.includes(task.id))
    })
  }
}

function displayGetErrorIfResponseError() {
  console.log("NOT IMPLEMENTED! Error when communicating with the server")
}