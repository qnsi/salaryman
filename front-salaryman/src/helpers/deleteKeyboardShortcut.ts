import React from "react"

export default function useDeleteKeyboardShortcut(deleteProgress: number, setDeleteProgress: Function, deleteTask: Function, focusedTaskId: number) {
  const intervalRef = React.useRef<NodeJS.Timer | null>(null);

  React.useEffect(() => {
    return () => stopCounter(); // when App is unmounted we should stop counter
  }, []);

  React.useEffect(() => {
    if (deleteProgress > 100) {
      deleteTask(focusedTaskId)
      stopCounter()
    }
  }, [deleteProgress])

  const handleKeyDown = React.useCallback((event: KeyboardEvent) => {
    console.log("key pressed")
    if (event.key === "d") {
      startCounter()
    }
  }, [deleteProgress])

  const handleKeyUp = React.useCallback((event: KeyboardEvent) => {
    if (event.key === "d") {
      stopCounter()
    }
  }, [deleteProgress])

  const startCounter = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setDeleteProgress((prev: number) => prev+1)
    }, 20);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setDeleteProgress(0)
    }
  };

  React.useEffect(addAndRemoveKeyboardListeners, [])

  function addAndRemoveKeyboardListeners() {
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }
}