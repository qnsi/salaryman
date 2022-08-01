import React from "react";
import { TaskType } from "../../types/TaskType";

export default function Task(props: { task: TaskType, setAddingSubtaskId: Function, deleteTask: Function,
                                      collapseTask: Function, setFocusedTaskId: Function, focusedTaskId: number,
                                      setFocusedTaskNotDone: Function,
                                      deleteProgress: number, markAsDone: Function, doneProgress: number}) {
  var collapsedClass = "fa-solid fa-chevron-down"
  if (props.task.collapsed) {
    collapsedClass = "fa-solid fa-chevron-right"
  }
  var intendationArray = Array.from({length: props.task.intendation}, Math.random)

  var deleteText = "Delete"
  if (props.deleteProgress > 0) {
    deleteText = `${props.deleteProgress}%`
  }

  var markAsDoneText = "Done"
  if (props.doneProgress > 0) {
    markAsDoneText = `${props.doneProgress}%`
  }

  var taskClasses = "task"
  var buttons = <></>
  if (props.focusedTaskId === props.task.id) {
    if (!props.task.isDone) {
      buttons = (
        <div className="task-buttons">
          <button onClick={() => {props.markAsDone(props.task.id)}}>{markAsDoneText}</button>
          <button onClick={() => {props.setAddingSubtaskId(props.task.id)}}>Add Subtask</button>
          <button onClick={() => {props.deleteTask(props.task.id)}}>{deleteText}</button>
        </div>
      )
    }
    taskClasses = "task task-focused"
  }
  if (props.task.isDone) {
    taskClasses += " task-is-done"
  }

  var childrenDoneBadge = ""
  if (props.task.doneChildren > 0) {
    childrenDoneBadge = `(${props.task.doneChildren} subtasks done)`
  }

  function elementFocused() {
    props.setFocusedTaskId(props.task.id)
    props.setFocusedTaskNotDone(!props.task.isDone)
  }

  function elementDefocused() {
    props.setFocusedTaskId(0)
    props.setFocusedTaskNotDone(true)
  }

  return (
    <div
     onMouseEnter={elementFocused}
     onMouseLeave={elementDefocused}
     className="task-container"
    >
      {intendationArray.map((value) => {
        return (
          <div key={value} className="task-line-container">
            <div className="task-line-border"></div>
          </div>
        )
      })}
      <div className={taskClasses} key={props.task.id} >
        <i className={"task-collapse-button " + collapsedClass} onClick={() => props.collapseTask(props.task)}></i>
        <span className="task-text">{props.task.text} <span className="task-children-badge">{childrenDoneBadge}</span></span>
        <span className="task-spacer"></span>
        {buttons}
      </div>
    </div>
  )
}