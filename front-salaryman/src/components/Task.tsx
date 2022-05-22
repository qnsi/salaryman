import { TaskType } from "./TaskView";

export default function Task(props: {task: TaskType, setAddingSubtaskId: Function, deleteTask: Function, collapseTask: Function}) {
  var collapsedCharacter = "-"
  if (props.task.collapsed) {
    collapsedCharacter = "+"
  }

  return (
    <div className="task" key={props.task.id} style={{margin: `0 0 0 ${props.task.intendation * 10}px`}} >
      <span onClick={() => props.collapseTask(props.task)}>{collapsedCharacter}</span>
      <span>{props.task.text}</span>
      {/* <button onClick={() => {props.editTask}}>Edit</button> */}
      <button onClick={() => {props.setAddingSubtaskId(props.task.id)}}>Subtask</button>
      <button onClick={() => {props.deleteTask(props.task.id)}}>Delete</button>
    </div>
  )
}