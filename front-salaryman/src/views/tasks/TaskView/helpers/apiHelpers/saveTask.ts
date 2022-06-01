import { TaskType } from "../../../../../types/TaskType"

type newTaskResponse = { status: string, task: TaskType }

export function handleNewTaskResponse(response: newTaskResponse, setTasks: Function) {
  if (response.status === "ok") {
    updateStateIfResponseOk(response, setTasks)
  } else {
    displayErrorIfResponseError(response)
  }
}

function updateStateIfResponseOk(response: newTaskResponse, setTasks: Function) {
  setTasks((state: TaskType[]) => {
    var newState = [...state]
    if (response.task.parentId) {
      response = setCorrectIntendation(state, response)
      const nextUncleIndexInState = findAncestorUncle(state, response.task)
      newState.splice(nextUncleIndexInState, 0, response.task)
    } else {
      response.task.intendation = 0
      newState.push(response.task)
    }
    return newState
  })
}

function setCorrectIntendation(state: TaskType[], response: newTaskResponse) {
  const parent = state.find((task) => task.id === response.task.parentId) as TaskType
  response.task.intendation = parent.intendation + 1
  return response
}

function findAncestorUncle(state: TaskType[], current_task: TaskType): number {
  if (current_task.parentId === null) {
    return state.length
  }

  const parent = state.find((task) => task.id === current_task.parentId) as TaskType
  const uncles = state.filter((task) => task.parentId === parent.parentId)
  const parentIndexOfInUncles = uncles.indexOf(parent)

  if (uncles.length === parentIndexOfInUncles + 1) {
    return findAncestorUncle(state, parent)
  } else {
    return state.indexOf(uncles[parentIndexOfInUncles+1])
  }
}


function displayErrorIfResponseError(response: newTaskResponse) {
  console.log("NOT IMPLEMENTED! Error when communicating with the server")
}