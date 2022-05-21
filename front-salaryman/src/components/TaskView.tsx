import React from "react";
import { deleteTaskFromBackend, handleDeleteResponse } from "../controllers/deleteTask";
import { getTasks, handleGetTasksResponse } from "../controllers/getTasks";
import { handleNewTaskResponse, saveTask } from "../controllers/saveTask";
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
      handleGetTasksResponse(response, setTasks)
    })
  }, [])

  async function addNewTask(value: string) {
    const response = await saveTask(value, 1)
    handleNewTaskResponse(response, setTasks)
  }

  async function deleteTask(id: number) {
    const response = await deleteTaskFromBackend(id)
    handleDeleteResponse(response, id, setTasks)
  }
  
  async function editTask(id: number) {

  }

  return (
    <div className="taskview">
      <div className="tasks">
        {tasks.map((task) => {
          return <Task key={task.id} task={task} editTask={editTask} deleteTask={deleteTask} />
        })}
      </div>
      <NewTaskForm addNewTask={addNewTask}/>
    </div>
  )
}