import React from "react"
import { getTaskFromBackend } from "../../../../api/getTasks"
import { TaskType } from "../../../../types/TaskType"

var initTask: TaskType = prepareInitTask()

export function useGetTaskFromBackendAndSet(): [TaskType, Function] {
  const [task, setTask] = React.useState(initTask)

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id'))
    getTaskFromBackend(id).then((response) => {
      setTask(response.data.task)
    }).catch(error => {
      window.alert("We couldn't connect to the server! Try again.\n\n" + error)
    })
  }, [])

  return [task, setTask]
}

function prepareInitTask() {
  var initTask: TaskType = {
    id: 0,
    isDone: false,
    order: 1,
    intendation: 0,
    parentId: 0,
    doneChildren: 0,
    doneDate: "",
    text: "",
    createdAt: "",
    updatedAt: "",
    collapsed: false,
    hidden: false
  }
  return initTask
}