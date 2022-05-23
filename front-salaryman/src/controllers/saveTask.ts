import { TaskType } from "../components/TaskView"

export function saveTask(text: string, order: number, parentId: number): Promise<{status: string, task: TaskType}> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3001/tasks/new", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({task: {text, order, parentId}})
    }).then(res => {
      if (res.ok) {
        res.json().then(json => { 
          resolve({status: "ok", task: json.task})
        })
      } else {
        reject({status: "error", task: <TaskType>{}})
      }
    }).catch(error => {
      reject({status: "error", task: <TaskType>{}})
    })
  })
}

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
    const siblings = state.filter((task) => task.parentId == response.task.parentId)
    const siblingsFiltered = siblings.sort((a,b) => a.order - b.order)
    const lastSibling = siblingsFiltered[siblingsFiltered.length - 1]
    const lastSiblingIndexOf = state.indexOf(lastSibling)
    
    response.task.intendation = lastSibling.intendation
    newState.splice(lastSiblingIndexOf+1, 0, response.task)
    return newState
  })
}

function displayErrorIfResponseError(response: newTaskResponse) {
  console.log("NOT IMPLEMENTED! Error when communicating with the server")
}
