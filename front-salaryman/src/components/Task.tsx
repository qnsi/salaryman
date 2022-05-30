import React from "react";
import { TaskType } from "./TaskView";

export default function Task(props: { task: TaskType, setAddingSubtaskId: Function, deleteTask: Function,
                                      collapseTask: Function, setFocusedTaskId: Function, focusedTaskId: number
                                      deleteProgress: number}) {
  var collapsedCharacter = "- "
  if (props.task.collapsed) {
    collapsedCharacter = "+ "
  }
  var intendationArray = Array.from({length: props.task.intendation}, Math.random)

  var deleteText = "Delete"
  if (props.deleteProgress > 0) {
    deleteText = `${props.deleteProgress}%`
  }

  var taskClasses = "task"
  var buttons = <></>
  if (props.focusedTaskId === props.task.id) {
    buttons = (
      <div className="task-buttons">
        <button onClick={() => {props.setAddingSubtaskId(props.task.id)}}>Add Subtask</button>
        <button onClick={() => {props.deleteTask(props.task.id)}}>{deleteText}</button>
      </div>
    )
    taskClasses = "task task-focused"
  }


  return (
    <div
     onMouseEnter={()=>props.setFocusedTaskId(props.task.id)}
     onMouseLeave={()=>props.setFocusedTaskId(0)}
     className="task-container"
    >
      {intendationArray.map(() => {
        return (
          <div className="task-line-container">
            <div className="task-line-border"></div>
          </div>
        )
      })}
      <div className={taskClasses} key={props.task.id} >
        <span onClick={() => props.collapseTask(props.task)}>{collapsedCharacter}</span>
        <span className="task-text">{props.task.text}</span>
        <span className="task-spacer"></span>
        {buttons}
      </div>
    </div>
  )
}