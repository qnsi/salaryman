import React from "react"
import { getTasksFromBackend } from "../../../../../api/getTasks"
import { TaskType } from "../../../../../types/TaskType"

var initTasks: TaskType[] = []

export function useGetTasksFromBackendAndSet(initialTasks: TaskType[], controlledComponent: boolean): [TaskType[], Function] {
  const [tasks, setTasks] = React.useState(initTasks)

  React.useEffect(() => {
    if (controlledComponent) {
      setTasks(initialTasks)
    } else {
      getTasksFromBackend().then((response) => {
        handleGetTasksResponse(response.data, setTasks)
      }).catch(error => {
        window.alert("We couldn't connect to the server! Try again.\n\n" + error)
      })
    }
  }, [initialTasks])

  return [tasks, setTasks]
}

type getTasksResponse = { status: string, tasks: TaskType[] }
async function handleGetTasksResponse(response: getTasksResponse, setTasks: Function) {
  if (response.status === "ok") {
    _setInitialTasks(response.tasks, setTasks)
  }
}

export function _setInitialTasks(tasks: any, setTasks: Function) {
  const intendatedTasks = prepareTasksWithIntendationAndDoneChildren(tasks)
  const hiddenTasks = hidTaskThatShouldBeCollapsed(intendatedTasks)
  setTasks(hiddenTasks)
}

function prepareTasksWithIntendationAndDoneChildren(tasks: TaskType[]) {
  tasks = tasks.sort((a,b) => a.order - b.order)
  var tasksSorted: TaskType[] = []
  for (const task of tasks) {
    if (task.parentId === null) {
      if (!task.isDone) {
        task.intendation = 0
        const [descendents, newTask] = findTaskChildren(tasks, task, 0)
        tasksSorted = tasksSorted.concat([newTask])
        tasksSorted = tasksSorted.concat(descendents)
      }
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
  console.log(children.length)
  parent.subtaskCount = children.length
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
