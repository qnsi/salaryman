import React from "react"
import { getDoneTasksFromBackend } from "../../../../api/getTasks"
import { TaskType } from "../../../../types/TaskType"

var initTasks: TaskType[] = []

export function useGetTasksFromBackendAndSet(): [TaskType[], Function] {
  const [tasks, setTasks] = React.useState(initTasks)

  React.useEffect(() => {
    getDoneTasksFromBackend().then((response) => {
      setTasks(response.data.tasks)
    }).catch(error => {
      window.alert("We couldn't connect to the server! Try again.\n\n" + error)
    })
  }, [])

  return [tasks, setTasks]
}