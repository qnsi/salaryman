import React from "react"
import { TaskType } from "../../../../types/TaskType";

export default function useHoldKeyboardShortcuts(deleteProgress: number, setDeleteProgress: Function,
                                                deleteTask: Function, focusedTaskId: number,
                                                doneProgress: number, setDoneProgress: Function,
                                                markAsDone: Function, inputFocused: boolean) {
  const deleteCounterRef = React.useRef<NodeJS.Timer | null>(null);
  const doneCounterRef = React.useRef<NodeJS.Timer | null>(null);

  React.useEffect(() => {
    return () => {
      stopCounter(deleteCounterRef, setDeleteProgress)
      stopCounter(doneCounterRef, setDoneProgress)
    }
  }, []);

  React.useEffect(() => {
    if (deleteProgress > 100) {
      deleteTask(focusedTaskId)
      stopCounter(deleteCounterRef, setDeleteProgress)
    }
  }, [deleteProgress])

  React.useEffect(() => {
    if (doneProgress > 100) {
      markAsDone(focusedTaskId)
      stopCounter(doneCounterRef, setDoneProgress)
    }
  }, [doneProgress])

  const handleKeyDown = React.useCallback((event: KeyboardEvent) => {
    if (!event.repeat && !inputFocused) {
      if (event.key === "r") {
        startCounter(deleteCounterRef, setDeleteProgress, 1)
      } else if (event.key === "d") {
        startCounter(doneCounterRef, setDoneProgress, 3)
      }
    }
  }, [inputFocused, deleteProgress, doneProgress])

  const handleKeyUp = React.useCallback((event: KeyboardEvent) => {
    if (event.key === "r") {
      stopCounter(deleteCounterRef, setDeleteProgress)
    } else if (event.key == "d") {
      stopCounter(doneCounterRef, setDoneProgress)
    }
  }, [deleteProgress, doneProgress])

  const startCounter = (ref: React.MutableRefObject<NodeJS.Timer | null>, setState: Function, increment: number) => {
    if (ref.current) return;
    ref.current = setInterval(() => {
      setState((prev: number) => prev+increment)
    }, 20);
  };

  const stopCounter = (ref: React.MutableRefObject<NodeJS.Timer | null>, setState: Function) => {
    if (ref.current) {
      clearInterval(ref.current);
      ref.current = null;
      setState(0)
    }
  };

  React.useEffect(addAndRemoveKeyboardListeners, [handleKeyDown, handleKeyUp])

  function addAndRemoveKeyboardListeners() {
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }
}