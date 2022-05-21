import React from "react";
import { getTasks } from "../controllers/getTasks";
import { saveTask } from "../controllers/saveTask";
import NewTaskForm from "./NewTaskForm";
import Task from "./Task";

export type TaskType = {
  id: number,
  isDone: boolean, 
  order: number,
  parentId: number
  text: string,
  createdAt: string,
  updatedAt: string,
}

var initTasks: TaskType[] = []

export default function TaskView() {
  const [tasks, setTasks] = React.useState(initTasks)

  React.useEffect(() => {
    getTasks().then((response) => {
      handleGetTasksResponse(response)
    })
  }, [])

  async function addNewTask(value: string) {
    const response = await saveTask(value, 1)
    handleNewTaskResponse(response)
  }

  return (
    <div className="taskview">
      <div className="tasks">
        {tasks.map((task) => {
          return <Task key={task.id} task={task} />
        })}
      </div>
      <NewTaskForm addNewTask={addNewTask}/>
    </div>
  )

  type newTaskResponse = {status: string, task: TaskType}

  function handleNewTaskResponse(response: newTaskResponse) {
    if (response.status === "ok") {
      updateStateIfResponseOk(response)
    } else {
      displayErrorIfResponseError(response)
    }
  }

  function updateStateIfResponseOk(response: newTaskResponse) {
    setTasks((state: TaskType[]) => {
      return state.concat([response.task])
    })
  }

  function displayErrorIfResponseError(response: newTaskResponse) {
    console.log("NOT IMPLEMENTED! Error when communicating with the server")
  }

  type getTasksResponse = {status: string, tasks: TaskType[]}

  function handleGetTasksResponse(response: getTasksResponse) {
    if (response.status === "ok") {
      setInitialTasks(response)
    } else {
      displayGetErrorIfResponseError(response)
    }
  }

  function setInitialTasks(response: getTasksResponse) {
    setTasks(response.tasks)
  }

  function displayGetErrorIfResponseError(response: getTasksResponse) {
    console.log("NOT IMPLEMENTED! Error when communicating with the server")
  }
}