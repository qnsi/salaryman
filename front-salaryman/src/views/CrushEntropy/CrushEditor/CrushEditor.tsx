import React from "react"
import { CrushLine } from "../../../types/CrushLine"
import useAutoSaveInBackend from "./hooks/useAutoSaveInBackend"
import useGetCrushEditorValueFromBackend from "./hooks/useGetCrushEditorValueFromBackend"
import useTranslateValue from "./hooks/useTranslateValue"
import { Temporal } from 'temporal-polyfill'

export default function CrushEditor(props: { setLines: Function, lines: CrushLine[] }) {
  const [day, setDay] = React.useState(Temporal.Now.plainDateISO().toString())

  const [value, setValue] = useGetCrushEditorValueFromBackend(day)
  const [autoSaveState, setAutoSaveState] = React.useState("State saved")

  useTranslateValue(value, props.setLines)
  useAutoSaveInBackend(setAutoSaveState, value, day)

  return (
    <div className="flex flex-col">
      <textarea autoCorrect="off" spellCheck="false" className="crush-editor mx-2 mt-2 h-90v text-xs"
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)} 
      >
      </textarea>
      <p>{autoSaveState}</p>
    </div>
  )
}
