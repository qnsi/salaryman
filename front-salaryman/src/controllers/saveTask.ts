import { TaskType } from "../components/TaskView"

export function saveTask(text: string, order: number): Promise<{status: string, task: TaskType}> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3001/tasks/new", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({task: {text, order}})
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
