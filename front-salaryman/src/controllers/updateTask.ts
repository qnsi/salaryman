import { TaskType } from "../components/TaskView"

export function updateTaskInBackend(id: number, collapsed: boolean): Promise<{status: string}> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3001/tasks", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({task: {id, collapsed}})
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

export function markAsDoneInBackend(id: number, isDone: boolean): Promise<{status: string}> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3001/tasks", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({task: {id, isDone}})
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

export function updateTaskIsDone(id: number, setTasks: Function, isDone: boolean) {
  setTasks((state: TaskType[]) => {
    return state.map(task => {
      if (task.id === id) {
        task.isDone = isDone
        return task
      } else {
        return task
      }
    })
  })
}