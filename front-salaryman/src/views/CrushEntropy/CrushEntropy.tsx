import React from "react"
import CrushEditor from "./CrushEditor/CrushEditor"
import { CrushLine } from "../../types/CrushLine"
import CrushCalendar from "./CrushCalendar"
import { useGetTasksFromBackendAndSet } from "../tasks/TaskView/hooks/apiHooks/useGetTasks"
import { TaskType } from "../../types/TaskType"
var emptyCrushLines: CrushLine[] = []

export default function CrushEntropy() {
  const [lines, setLines] = React.useState(emptyCrushLines)
  const initTasks: TaskType[] = []
  // const [tasks, setTasks] = useGetTasksFromBackendAndSet(initTasks, false)

  // React.useEffect(() => {
  //   console.log(tasks)
  // }, [tasks])

  React.useEffect(() => {
    console.log("Render")
  })


  return (
    <div className="grid grid-cols-2 h-fit">
      <CrushEditor setLines={setLines} lines={lines} tasks={[]}/>
      <CrushCalendar lines={lines}/>
    </div>
  )
}

