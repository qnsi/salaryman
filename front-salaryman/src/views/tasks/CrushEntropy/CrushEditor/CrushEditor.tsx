import React from "react"
import { CrushLine } from "../../../../types/CrushLine"
import useAutoSaveInBackend from "./hooks/useAutoSaveInBackend"
import useTranslateValue from "./hooks/useTranslateValue"

export default function CrushEditor(props: {inputFocused: boolean, setInputFocused: Function
                                            setLines: Function, lines: CrushLine[] }) {

  const [value, setValue] = React.useState("")
  const [autoSaveState, setAutoSaveState] = React.useState("State saved")

  useTranslateValue(value, props.setLines)
  useAutoSaveInBackend(setAutoSaveState, value)

  return (
    <div className="flex flex-col">
      <textarea autoCorrect="off" spellCheck="false" className="crush-editor mx-2 mt-2 h-90v text-xs"
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)} 
              onFocus={(e) => props.setInputFocused(true)}
              onBlur={(e) => props.setInputFocused(false)}
      >
      </textarea>
      <p>{autoSaveState}</p>
    </div>
  )
}
