import { TaskType } from "./TaskView";

export default function Task(props: {task: TaskType, editTask: Function, deleteTask: Function}) {
  return (
    <div className="task" key={props.task.id}>
      <span>•</span>
      <span>{props.task.text}</span>
      {/* <button onClick={() => {props.editTask}}>Edit</button> */}
      <button onClick={() => {props.deleteTask(props.task.id)}}>Delete</button>
    </div>
  )
}