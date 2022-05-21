import { TaskType } from "./TaskView";

export default function Task(props: {task: TaskType}) {
  return (
    <div className="task" key={props.task.id}>
      <span>•</span>
      <span>{props.task.text}</span>
    </div>
  )
}