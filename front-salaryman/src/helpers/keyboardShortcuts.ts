import React from "react"
import { TaskType } from "../components/TaskView"

export default function useKeyboardShortcuts(tasks: TaskType[], focusedTaskId: number, setFocusedTaskId: Function,
                                             setAddingSubtaskId: Function, setInputFocused: Function, inputFocused: boolean) {

  const handleKeyPress = React.useCallback((event: KeyboardEvent) => {
    handleKeysWhenBulletFocused(event, tasks, focusedTaskId, setFocusedTaskId, setAddingSubtaskId, setInputFocused, inputFocused)
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
                                     setAddingSubtaskId: Function, setInputFocused: Function, inputFocused: boolean) {
  if (!inputFocused) {
    if (event.key === "j") {
      moveFocusDown(tasks, focusedTaskId, setFocusedTaskId)
    } else if (event.key === "k") {
      moveFocusUp(tasks, focusedTaskId, setFocusedTaskId)
    } else if (event.key == "s") {
      if (focusedTaskId !== 0) {
        setInputFocused(true)
        openSubtaskForm(focusedTaskId, setAddingSubtaskId)
      }
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

function moveFocusUp(tasks: TaskType[], focusedTaskId: number, setFocusedTaskId: Function) {
  var prevFocused = 0
  if (focusedTaskId === 0) {
    prevFocused = tasks[tasks.length - 1].id
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
    return nextElement.id
  }
} 

function getPrevFocusedElementId(tasks: TaskType[], focusedTaskId: number) {
  const task = tasks.find((task) => task.id === focusedTaskId) as TaskType
  const taskIndex = tasks.indexOf(task)
  if (taskIndex === 0) {
    return tasks[tasks.length - 1].id
  } else {
    const prevElement = tasks[taskIndex - 1]
    return prevElement.id
  }
} 

function openSubtaskForm(focusedTaskId: number, setAddingSubtaskId: Function) {
  setAddingSubtaskId(focusedTaskId)
}