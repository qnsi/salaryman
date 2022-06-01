import React from "react";
import { deleteTaskFromBackend, handleDeleteResponse } from "../../../api/deleteTask";
import { getTasks, handleGetTasksResponse } from "../../../api/getTasks";
import { handleNewTaskResponse, saveTask } from "../../../api/saveTask";
import { markAsDoneInBackend, updateTaskInBackend, updateTaskIsDone } from "../../../api/updateTask";
import useHoldKeyboardShortcuts from "./hooks/useHoldKeyboardShortcuts";
import useKeyboardShortcuts, { moveFocusUp } from "./hooks/useKeyboardShortcuts";
import { moveTaskDown, moveTaskUp } from "./helpers/moveTasks";
import NewTaskForm from "../NewTaskForm";
import Task from "../Task";
import { TaskType } from "../../../types/TaskType";

var initTasks: TaskType[] = []

export default function TaskView() {
  const [tasks, setTasks] = React.useState(initTasks)
  const [addingSubtaskId, setAddingSubtaskId] = React.useState(0)
  const [focusedTaskId, setFocusedTaskId] = React.useState(0)
  const [inputFocused, setInputFocused] = React.useState(true)
  const [deleteProgress, setDeleteProgress] = React.useState(0)
  const [doneProgress, setDoneProgress] = React.useState(0)

  React.useEffect(() => {
    getTasks().then((response) => {
      handleGetTasksResponse(response, setTasks)
    })
  }, [])

  useKeyboardShortcuts(tasks, focusedTaskId, setFocusedTaskId, setAddingSubtaskId, setInputFocused, inputFocused, collapseTask,
                       _moveTaskUp, _moveTaskDown)
  useHoldKeyboardShortcuts(deleteProgress, setDeleteProgress, deleteTask, focusedTaskId,
                          doneProgress, setDoneProgress, markAsDone, inputFocused)

  function _moveTaskUp(focusedTaskId: number) {
    moveTaskUp(focusedTaskId, tasks, setTasks)
  }

  function _moveTaskDown(focusedTaskId: number) {
    moveTaskDown(focusedTaskId, tasks, setTasks)
  }

  async function addNewTask(value: string, parentId: number) {
    setAddingSubtaskId(0)
    const response = await saveTask(value, 1, parentId)
    handleNewTaskResponse(response, setTasks)
  }

  async function deleteTask(id: number) {
    const response = await deleteTaskFromBackend(id)
    handleDeleteResponse(response, id, tasks, setTasks)
    moveFocusUp(tasks, id, setFocusedTaskId)
  }

  async function markAsDone(id: number) {
    const task = tasks.find(stateTask => stateTask.id == id) as TaskType
    const response = await markAsDoneInBackend(id, !task.isDone)
    if (response.status === "ok") {
      updateTaskIsDone(id, setTasks, !task.isDone)
    } else {
      console.log("ERROR in markAsDone")
    }
    moveFocusUp(tasks, id, setFocusedTaskId)
  }

  return (
    <div className="taskview">
      <div className="tasks">
        {tasks.map((task) => {
          {return constructTask(task)}
        })}
      </div>
      <NewTaskForm addNewTask={addNewTask} parentId={0} focusedTaskId={focusedTaskId} inputFocused={inputFocused} setInputFocused={setInputFocused}/>
    </div>
  )

  function constructTask(task: TaskType) {
    const taskElement = <Task key={task.id} task={task} setAddingSubtaskId={setAddingSubtaskId}
                              deleteTask={deleteTask} deleteProgress={deleteProgress} collapseTask={collapseTask} 
                              focusedTaskId={focusedTaskId} setFocusedTaskId={setFocusedTaskId}
                              markAsDone={markAsDone} doneProgress={doneProgress}
                        />
    if (task.hidden) {
      return <div key={task.id}></div>
    }
    if (addingSubtaskId == task.id) {
      return (
        <div key={task.id}>
          {taskElement}
          <NewTaskForm addNewTask={addNewTask} parentId={task.id} focusedTaskId={focusedTaskId} inputFocused={inputFocused} setInputFocused={setInputFocused}/>
        </div>
      )
    } else {
      return taskElement
    }
  }

  async function collapseTask(task: TaskType) {
    collapseInState(task)
    const resp = await updateTaskInBackend(task.id, !task.collapsed)
  }

  function collapseInState(task: TaskType) {
    setTasks((state: TaskType[]) => {
      var newState: TaskType[] = []
      var startingCollapse = false

      // would like to refactor into functional style
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