import React from "react";

import { useGetTasksFromBackendAndSet } from "./hooks/apiHooks/useGetTasks";

import { saveTask } from "../../../api/saveTask";
import { handleNewTaskResponse } from "./hooks/apiHooks/saveTask";

import { markTaskAsDoneInBackend, markTaskAsCollapsed } from "../../../api/updateTask";
import { toggleCollapseInState, updateTaskIsDone } from "./hooks/updateTaskState";

import useHoldKeyboardShortcuts from "./hooks/useHoldKeyboardShortcuts";
import useKeyboardShortcuts, { moveFocusUp } from "./hooks/useKeyboardShortcuts";

import { moveTaskDown, moveTaskUp } from "../helpers/moveTasks";

import NewTaskForm from "../NewTaskForm";
import Task from "../Task";
import { TaskType } from "../../../types/TaskType";
import { deleteTask } from "./hooks/apiHooks/deleteTask";


export default function TaskView(props: {initialTasks: TaskType[], controlledComponent: boolean}) {
  const [addingSubtaskId, setAddingSubtaskId] = React.useState(0)

  const [focusedTaskId, setFocusedTaskId] = React.useState(0)
  const [inputFocused, setInputFocused] = React.useState(true)
  const [focusedTaskNotDone, setFocusedTaskNotDone] = React.useState(true)

  const [deleteProgress, setDeleteProgress] = React.useState(0)
  const [doneProgress, setDoneProgress] = React.useState(0)

  const [tasks, setTasks] = useGetTasksFromBackendAndSet(props.initialTasks, props.controlledComponent)

  useKeyboardShortcuts({tasks, focusedTaskId, setFocusedTaskId, setFocusedTaskNotDone, setAddingSubtaskId, setInputFocused, inputFocused, collapseTask, moveTaskUp: _moveTaskUp, moveTaskDown: _moveTaskDown})
  useHoldKeyboardShortcuts(deleteProgress, setDeleteProgress, _deleteTask, focusedTaskId, focusedTaskNotDone,
                          doneProgress, setDoneProgress, markAsDone, inputFocused)

  function _deleteTask(focusedTaskId: number) {
    deleteTask(focusedTaskId, tasks, setTasks, setFocusedTaskId, setFocusedTaskNotDone)
    .catch(error => {
      window.alert("We couldn't connect to the server! Try again.\n\n" + error)
    })
  }

  function _moveTaskUp(focusedTaskId: number) {
    moveTaskUp(focusedTaskId, tasks, setTasks)
  }

  function _moveTaskDown(focusedTaskId: number) {
    moveTaskDown(focusedTaskId, tasks, setTasks)
  }

  async function addNewTask(value: string, parentId: number) {
    setAddingSubtaskId(0)
    await saveTask(value, 1, parentId).then((response) => {
      handleNewTaskResponse(response.data, setTasks)
    })
    .catch(error => {
      window.alert("We couldn't connect to the server! Try again.\n\n" + error)
    })
  }


  async function markAsDone(id: number) {
    const task = tasks.find(stateTask => stateTask.id == id) as TaskType
    markTaskAsDoneInBackend(id, !task.isDone).then(response => {
      updateTaskIsDone(id, setTasks, !task.isDone)
    }).catch(error => {
      window.alert("We couldn't connect to the server! Try again.\n\n" + error)
    })
    moveFocusUp(tasks, id, setFocusedTaskId, setFocusedTaskNotDone)
  }

  return (
    <div className="taskWithCrush grow basis-11/12 flex">
      <div className="taskview grow basis-1/3">
        <div className="tasks">
          {tasks.map((task) => {
            {return constructTask(task)}
          })}
        </div>
        <NewTaskForm addNewTask={addNewTask} parentId={0} focusedTaskId={focusedTaskId} inputFocused={inputFocused} setInputFocused={setInputFocused}/>
      </div>
    </div>
  )

  function constructTask(task: TaskType) {
    const taskElement = <Task key={task.id} task={task} setAddingSubtaskId={setAddingSubtaskId}
                              deleteTask={_deleteTask} deleteProgress={deleteProgress} collapseTask={collapseTask} 
                              focusedTaskId={focusedTaskId} setFocusedTaskId={setFocusedTaskId}
                              setFocusedTaskNotDone={setFocusedTaskNotDone}
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
      return <div key={task.id}>{taskElement}</div>
    }
  }

  async function collapseTask(task: TaskType) {
    toggleCollapseInState(task, tasks, setTasks)
    const resp = await markTaskAsCollapsed(task.id, !task.collapsed)
  }
}