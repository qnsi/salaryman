import { useGetTaskFromBackendAndSet } from "./hooks/useGetTask"
import { TaskType } from "../../../types/TaskType"
import TaskView from "../TaskView/TaskView"

export default function IndividualTask() {
  const [tasks, setTasks] = useGetTaskFromBackendAndSet()

  return (
    <TaskView initialTasks={tasks} setTasks={setTasks} controlledComponent={true} />
  )
}