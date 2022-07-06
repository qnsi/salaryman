import React from "react"
import { getTaskFromBackend } from "../../../../api/getTasks"
import { TaskType, TaskWithAncestors } from "../../../../types/TaskType"

var initTask: TaskType[] = []

export function useGetTaskFromBackendAndSet(): [TaskType[], Function] {
  const [tasks, setTasks] = React.useState(initTask)

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id'))
    getTaskFromBackend(id).then((response) => {
      const tasksInOrder = prepareTasksFromBackend(response.data.task, 0)
      setTasks(tasksInOrder)
    }).catch(error => {
      window.alert("We couldn't connect to the server! Try again.\n\n" + error)
    })
  }, [])

  return [tasks, setTasks]
}


function prepareTasksFromBackend(task: TaskWithAncestors, intendation: number): TaskType[] {
  const {childTasks, ...taskWithoutAncestors} = task
  taskWithoutAncestors.intendation = intendation
  var ancestorTasks: TaskType[] = []


  for (const childTask of childTasks) {
    const childAncestorTasks = prepareTasksFromBackend(childTask, intendation+1)
    ancestorTasks = ancestorTasks.concat(childAncestorTasks)
  }

  return [taskWithoutAncestors].concat(ancestorTasks)
}