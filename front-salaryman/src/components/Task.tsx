import React from "react";
import { TaskType } from "./TaskView";

export default function Task(props: {task: TaskType, setAddingSubtaskId: Function, deleteTask: Function, collapseTask: Function}) {
  const [hovered, setHovered] = React.useState(false)

  var collapsedCharacter = "- "
  if (props.task.collapsed) {
    collapsedCharacter = "+ "
  }
  var intendationArray = Array.from({length: props.task.intendation}, Math.random)

  var buttons = <></>
  if (hovered) {
    buttons = (
      <div className="task-buttons">
        <button onClick={() => {props.setAddingSubtaskId(props.task.id)}}>Add Subtask</button>
        <button onClick={() => {props.deleteTask(props.task.id)}}>Delete</button>
      </div>
    )
  }

  return (
    <div
     onMouseEnter={()=>setHovered(true)}
     onMouseLeave={()=>setHovered(false)}
     className="task-container"
    >
      {intendationArray.map(() => {
        return (
          <div className="task-line-container">
            <div className="task-line-border"></div>
          </div>
        )
      })}
      <div className="task" key={props.task.id} >
        <span onClick={() => props.collapseTask(props.task)}>{collapsedCharacter}</span>
        <span className="task-text">{props.task.text}</span>
        <span className="task-spacer"></span>
        {buttons}
      </div>
    </div>
  )
}