import React from "react"
import { getTasksFromBackend } from "../../../api/getTasks"
import { TaskType } from "../../../types/TaskType"

export default function TaskDropdown(props: {isShowing: boolean, dropdownCoords: {x: number, y: number}, tasks: TaskType[]}) {
  var element = <></>
  if (props.isShowing) {
    element = <div 
      style={{
        position: "absolute",
        left: props.dropdownCoords.x,
        top: (props.dropdownCoords.y + 20)
      }}
      className="bg-slate-200"
    >
      {props.tasks.map((task) => {
        return <div>{task.text}</div>
      })}
    </div>
  }

  return element
}