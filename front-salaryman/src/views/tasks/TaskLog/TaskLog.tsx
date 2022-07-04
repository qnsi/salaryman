import { useGetTasksFromBackendAndSet } from "./hooks/useGetDoneTasks"
import { TaskType } from "../../../types/TaskType"

export default function TaskLog() {
  const [tasks, setTasks] = useGetTasksFromBackendAndSet()

  function constructTask(task: TaskType) {
    return <div>{task.doneDate} <b>{task.text}</b></div>
  }

  return (
    <div className="taskview">
      <div className="tasks">
        {tasks.map((task) => {
          {return constructTask(task)}
        })}
      </div>
    </div>
  )

}