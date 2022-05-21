import { TaskType } from "../components/TaskView"

export function getTasks(): Promise<{ tasks: TaskType[], status: string }> {
  const emptyTasks: TaskType[] = []
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3001/tasks`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      }
    }).then(res => {
      if (res.ok) {
        res.json().then(json => {
          resolve({ status: "ok", tasks: json.tasks })
        })
      } else {
        reject({tasks: emptyTasks, status: "error"})
      }
    }).catch(error => {
      reject({tasks: emptyTasks, status: "error"})
    })
  })
}
type getTasksResponse = { status: string, tasks: TaskType[] }

export function handleGetTasksResponse(response: getTasksResponse, setTasks: Function) {
  if (response.status === "ok") {
    setInitialTasks(response, setTasks)
  } else {
    displayGetErrorIfResponseError(response)
  }
}

function setInitialTasks(response: getTasksResponse, setTasks: Function) {
  setTasks(response.tasks)
}

function displayGetErrorIfResponseError(response: getTasksResponse) {
  console.log("NOT IMPLEMENTED! Error when communicating with the server")
}