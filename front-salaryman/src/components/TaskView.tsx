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
  intendation: number,
  parentId: number
  text: string,
  createdAt: string,
  updatedAt: string,
  collapsed: boolean,
  hidden: boolean,
}

var initTasks: TaskType[] = []

export default function TaskView() {
  const [tasks, setTasks] = React.useState(initTasks)
  const [addingSubtaskId, setAddingSubtaskId] = React.useState(0)

  React.useEffect(() => {
    getTasks().then((response) => {
      handleGetTasksResponse(response, setTasks)
    })
  }, [])

  async function addNewTask(value: string, parentId: number) {
    setAddingSubtaskId(0)
    const response = await saveTask(value, 1, parentId)
    handleNewTaskResponse(response, setTasks)
  }

  async function deleteTask(id: number) {
    const response = await deleteTaskFromBackend(id)
    handleDeleteResponse(response, id, setTasks)
  }

  return (
    <div className="taskview">
      <div className="tasks">
        {tasks.map((task) => {
          {return constructTask(task)}
        })}
      </div>
      <NewTaskForm addNewTask={addNewTask} parentId={0}/>
    </div>
  )

  function constructTask(task: TaskType) {
    const taskElement = <Task key={task.id} task={task} setAddingSubtaskId={setAddingSubtaskId} deleteTask={deleteTask} collapseTask={collapseTask} />
    if (task.hidden) {
      return <></>
    }
    if (addingSubtaskId == task.id) {
      return (
        <div key={task.id}>
          {taskElement}
          <NewTaskForm addNewTask={addNewTask} parentId={task.id}/>
        </div>
      )
    } else {
      return taskElement
    }
  }

  function collapseTask(task: TaskType) {
    setTasks((state: TaskType[]) => {
      var newState: TaskType[] = []
      var startingCollapse = false

      for (var oldTask of state) {
        var newTask = {...oldTask}

        if (startingCollapse) {
          if (newTask.parentId === task.parentId) {
            startingCollapse = false
          } else if (newTask.intendation < task.intendation) {
            startingCollapse = false
          } else {
            newTask.hidden = !newTask.hidden
          }
        }
        if (newTask.id === task.id) {
          startingCollapse = true
          newTask.collapsed = !newTask.collapsed
        }
        newState.push(newTask)
      }
      return newState
    })
  }
}