import { TaskType } from "../components/TaskView"

export function deleteTaskFromBackend(id: number): Promise<{status: string}> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3001/tasks/delete", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({task: {id}})
    }).then(res => {
      if (res.ok) {
        res.json().then(json => { 
          resolve({status: "ok"})
        })
      } else {
        reject({status: "error"})
      }
    }).catch(error => {
      reject({status: "error"})
    })
  })
}

export function handleDeleteResponse(response: {status: string}, id: number, tasks: TaskType[], setTasks: Function) {
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