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

export async function handleGetTasksResponse(response: getTasksResponse, setTasks: Function) {
  if (response.status === "ok") {
    setInitialTasks(response, setTasks)
  } else {
    displayGetErrorIfResponseError(response)
  }
}

function setInitialTasks(response: getTasksResponse, setTasks: Function) {
  const tasks = prepareTasksWithIntendationAndDoneChildren(response.tasks)
  const hiddenTasks = hidTaskThatShouldBeCollapsed(tasks)
  setTasks(hiddenTasks)
}

function displayGetErrorIfResponseError(response: getTasksResponse) {
  console.log("NOT IMPLEMENTED! Error when communicating with the server")
}

function prepareTasksWithIntendationAndDoneChildren(tasks: TaskType[]) {
  tasks = tasks.sort((a,b) => a.order - b.order)
  var tasksSorted: TaskType[] = []
  for (const task of tasks) {
    if (task.parentId === null) {
      task.intendation = 0
      const [descendents, newTask] = findTaskChildren(tasks, task, 0)
      tasksSorted = tasksSorted.concat([newTask])
      tasksSorted = tasksSorted.concat(descendents)
    }
  }
  return tasksSorted
}

function findTaskChildren(tasks: TaskType[], parent: TaskType, intendation: number): [TaskType[], TaskType] {
  var children = tasks.filter((task) => task.parentId === parent.id)
  children = children.sort((a,b) => a.order - b.order)
  var ordered: TaskType[] = []
  var doneChildren = 0
  for (const child of children) {
    if (child.isDone) {
      doneChildren += 1
    } else {
      child.intendation = intendation+1
      const [grandchildren, newChild] = findTaskChildren(tasks, child, intendation+1)
      ordered = ordered.concat([newChild])
      ordered = ordered.concat(grandchildren)
    }
  }
  parent.doneChildren = doneChildren
  return [ordered, parent]
}

function hidTaskThatShouldBeCollapsed(tasks: TaskType[]) {
  for (const task of tasks) {
    if (task.collapsed) {
      tasks = hideChildrenInState(tasks, task)
    }
  }

  return tasks
}

function hideChildrenInState(tasks: TaskType[], task: TaskType) {
    var newState: TaskType[] = []
    var startingCollapse = false

    // would like to refactor into functional style
    for (var oldTask of tasks) {
      var newTask = { ...oldTask }

      if (startingCollapse) {
        if (newTask.parentId === task.parentId) {
          startingCollapse = false
        } else if (newTask.intendation < task.intendation) {
          startingCollapse = false
        } else {
          newTask.hidden = !newTask.hidden
        }
      }
      if (newTask.id === task.id) {
        startingCollapse = true
      }
      newState.push(newTask)
    }
    return newState
}

