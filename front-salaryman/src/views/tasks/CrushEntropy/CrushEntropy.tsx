import React from "react"
import CrushEditor from "./CrushEditor"
import { CrushLine } from "../../../types/CrushLine"
var emptyCrushLines: CrushLine[] = []

export default function CrushEntropy(props: {inputFocused: boolean, setInputFocused: Function}) {
  const [lines, setLines] = React.useState(emptyCrushLines)
  return (
    <div className="grid grid-cols-2 h-fit">
      <CrushEditor inputFocused={props.inputFocused} setInputFocused={props.setInputFocused}
                   setLines={setLines} lines={lines}/>
      <CrushCalendar lines={lines}/>
    </div>
  )
}


function CrushCalendar(props: {lines: CrushLine[]}) {
  return (
    <div>
      {props.lines.map((line) => {
        return <h1>{line.column}:{line.start}:{line.end} - {line.text}</h1>
      })}
    </div>
  )
}