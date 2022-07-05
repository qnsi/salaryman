import { useGetTaskFromBackendAndSet } from "./hooks/useGetTask"
import { TaskType } from "../../../types/TaskType"

export default function IndividualTask() {
  const [task, setTask] = useGetTaskFromBackendAndSet()

  return (
    <div className="taskview">
      <div className="tasks">
        <div><b>{task.text}</b></div>
      </div>
    </div>
  )
}