import React from "react"
import CrushEditor from "./CrushEditor/CrushEditor"
import { CrushLine } from "../../types/CrushLine"
import CrushCalendar from "./CrushCalendar"
var emptyCrushLines: CrushLine[] = []

export default function CrushEntropy() {
  const [lines, setLines] = React.useState(emptyCrushLines)
  return (
    <div className="grid grid-cols-2 h-fit">
      <CrushEditor setLines={setLines} lines={lines}/>
      <CrushCalendar lines={lines}/>
    </div>
  )
}

