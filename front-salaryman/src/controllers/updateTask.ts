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