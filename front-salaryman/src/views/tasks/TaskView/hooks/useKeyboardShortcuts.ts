import React from "react"
import { TaskType } from "../../../../types/TaskType"

export default function useKeyboardShortcuts(tasks: TaskType[], focusedTaskId: number, setFocusedTaskId: Function,
                                             setAddingSubtaskId: Function, setInputFocused: Function, inputFocused: boolean,
                                             collapseTask: Function, moveTaskUp: Function, moveTaskDown: Function) {

  const handleKeyPress = React.useCallback((event: KeyboardEvent) => {
    handleKeysWhenBulletFocused(event, tasks, focusedTaskId, setFocusedTaskId, setAddingSubtaskId, setInputFocused, inputFocused,
                                collapseTask, moveTaskDown, moveTaskUp)
  }, [tasks, focusedTaskId, inputFocused])

  React.useEffect(addAndRemoveKeyboardListeners, [handleKeyPress])

  function addAndRemoveKeyboardListeners() {
    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }
}

function handleKeysWhenBulletFocused(event: KeyboardEvent, tasks: TaskType[], focusedTaskId: number, setFocusedTaskId: Function,
                                     setAddingSubtaskId: Function, setInputFocused: Function, inputFocused: boolean,
                                     collapseTask: Function, moveTaskDown: Function, moveTaskUp: Function) {
  if (!inputFocused) {
    if (event.key === "j") {
      moveFocusDown(tasks, focusedTaskId, setFocusedTaskId)
    } else if (event.key === "J"){ 
      moveTaskDown(focusedTaskId)
    } else if (event.key === "k") {
      moveFocusUp(tasks, focusedTaskId, setFocusedTaskId)
    } else if (event.key === "K") {
      moveTaskUp(focusedTaskId)
    } else if (event.key == "s") {
      if (focusedTaskId !== 0) {
        event.preventDefault()
        setInputFocused(true)
        openSubtaskForm(focusedTaskId, setAddingSubtaskId)
      }
    } else if (event.key === "h") {
      const task = tasks.find(task => task.id === focusedTaskId)
      collapseTask(task)
    }
  } else {
    if (event.key === "Escape") {
      setInputFocused(false)
      setFocusedTaskId(0)
      setAddingSubtaskId(0)
    }
  }
}

function moveFocusDown(tasks: TaskType[], focusedTaskId: number, setFocusedTaskId: Function) {
  var nextFocused = 0
  if (focusedTaskId === 0) {
    nextFocused = tasks[0].id
  } else {
    nextFocused = getNextFocusedElementId(tasks, focusedTaskId)
  }
  setFocusedTaskId(nextFocused)
}

export function moveFocusUp(tasks: TaskType[], focusedTaskId: number, setFocusedTaskId: Function) {
  var prevFocused = 0
  if (focusedTaskId === 0) {
    const prevFocusedTask = tasks[tasks.length - 1]
    if (prevFocusedTask.hidden) {
      prevFocused = getPrevFocusedElementId(tasks, prevFocusedTask.id)
    } else {
      prevFocused = prevFocusedTask.id
    }
  } else {
    prevFocused = getPrevFocusedElementId(tasks, focusedTaskId)
  }
  setFocusedTaskId(prevFocused)
}

function getNextFocusedElementId(tasks: TaskType[], focusedTaskId: number) {
  const task = tasks.find((task) => task.id === focusedTaskId) as TaskType
  const taskIndex = tasks.indexOf(task)
  if (taskIndex === tasks.length - 1) {
    return tasks[0].id
  } else {
    const nextElement = tasks[taskIndex +1]
    var id = nextElement.id
    if (nextElement.hidden) {
      id = getNextFocusedElementId(tasks, nextElement.id)
    }
    return id
  }
} 

function getPrevFocusedElementId(tasks: TaskType[], focusedTaskId: number): number {
  const task = tasks.find((task) => task.id === focusedTaskId) as TaskType
  const taskIndex = tasks.indexOf(task)
  if (taskIndex === 0) {
    const prevTask =  tasks[tasks.length - 1]
    if (prevTask.hidden) {
      return getPrevFocusedElementId(tasks, prevTask.id)
    } else {
      return prevTask.id
    }
  } else {
    const prevTask = tasks[taskIndex - 1]
    if (prevTask.hidden) {
      return getPrevFocusedElementId(tasks, prevTask.id)
    } else {
      return prevTask.id
    }
  }
} 

function openSubtaskForm(focusedTaskId: number, setAddingSubtaskId: Function) {
  setAddingSubtaskId(focusedTaskId)
}