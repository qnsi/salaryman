import React from "react"
import { TaskType } from "../../../../types/TaskType"
type Params = {
  tasks: TaskType[],
  focusedTaskId: number,
  setFocusedTaskId: Function,
  setFocusedTaskNotDone: Function,
  setAddingSubtaskId: Function,
  setInputFocused: Function,
  inputFocused: boolean,
  collapseTask: Function,
  moveTaskUp: Function,
  moveTaskDown: Function
}


export default function useKeyboardShortcuts(params: Params) {

  const handleKeyPress = React.useCallback((event: KeyboardEvent) => {
    handleKeysWhenBulletFocused(event, params)
  }, [params.tasks, params.focusedTaskId, params.inputFocused])

  React.useEffect(addAndRemoveKeyboardListeners, [handleKeyPress])

  function addAndRemoveKeyboardListeners() {
    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }
}

function handleKeysWhenBulletFocused(event: KeyboardEvent, params: Params) {
  if (!params.inputFocused) {
    if (event.key === "j") {
      moveFocusDown(params.tasks, params.focusedTaskId, params.setFocusedTaskId, params.setFocusedTaskNotDone)
    } else if (event.key === "J"){ 
      params.moveTaskDown(params.focusedTaskId)
    } else if (event.key === "k") {
      moveFocusUp(params.tasks, params.focusedTaskId, params.setFocusedTaskId, params.setFocusedTaskNotDone)
    } else if (event.key === "K") {
      params.moveTaskUp(params.focusedTaskId)
    } else if (event.key == "s") {
      if (params.focusedTaskId !== 0) {
        event.preventDefault()
        params.setInputFocused(true)
        openSubtaskForm(params.focusedTaskId, params.setAddingSubtaskId)
      }
    } else if (event.key === "h") {
      const task = params.tasks.find(task => task.id === params.focusedTaskId)
      params.collapseTask(task)
    } else if (event.key === "f" && params.focusedTaskId !== 0) {
      window.location.href = `/?tab=task&id=${params.focusedTaskId}`
    }
  } else {
    if (event.key === "Escape") {
      params.setInputFocused(false)
      params.setFocusedTaskId(0)
      params.setAddingSubtaskId(0)
    }
  }
}

function moveFocusDown(tasks: TaskType[], focusedTaskId: number, setFocusedTaskId: Function, setFocusedTaskNotDone: Function) {
  var nextFocused = 0
  var task: TaskType
  if (focusedTaskId === 0) {
    task = tasks[0]
  } else {
    task = getNextFocusedElement(tasks, focusedTaskId)
  }
  nextFocused = task.id
  setFocusedTaskId(nextFocused)
  setFocusedTaskNotDone(!task.isDone)
}

export function moveFocusUp(tasks: TaskType[], focusedTaskId: number, setFocusedTaskId: Function, setFocusedTaskNotDone: Function) {
  var prevTask: TaskType
  if (focusedTaskId === 0) {
    prevTask = tasks[tasks.length - 1]
    if (prevTask.hidden) {
      prevTask = getPrevFocusedElement(tasks, prevTask.id)
    }
  } else {
    prevTask = getPrevFocusedElement(tasks, focusedTaskId)
  }
  setFocusedTaskId(prevTask.id)
  setFocusedTaskNotDone(!prevTask.isDone)
}

function getNextFocusedElement(tasks: TaskType[], focusedTaskId: number): TaskType {
  const task = tasks.find((task) => task.id === focusedTaskId) as TaskType
  const taskIndex = tasks.indexOf(task)
  if (taskIndex === tasks.length - 1) {
    return tasks[0]
  } else {
    var nextElement = tasks[taskIndex +1]
    if (nextElement.hidden) {
      nextElement = getNextFocusedElement(tasks, nextElement.id)
    }
    return nextElement
  }
} 

function getPrevFocusedElement(tasks: TaskType[], focusedTaskId: number): TaskType {
  const task = tasks.find((task) => task.id === focusedTaskId) as TaskType
  const taskIndex = tasks.indexOf(task)
  if (taskIndex === 0) {
    const prevTask =  tasks[tasks.length - 1]
    if (prevTask.hidden) {
      return getPrevFocusedElement(tasks, prevTask.id)
    } else {
      return prevTask
    }
  } else {
    const prevTask = tasks[taskIndex - 1]
    if (prevTask.hidden) {
      return getPrevFocusedElement(tasks, prevTask.id)
    } else {
      return prevTask
    }
  }
} 

function openSubtaskForm(focusedTaskId: number, setAddingSubtaskId: Function) {
  setAddingSubtaskId(focusedTaskId)
}