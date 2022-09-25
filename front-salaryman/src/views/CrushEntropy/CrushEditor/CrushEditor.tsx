import React, { FormEvent } from "react"
import { CrushLine } from "../../../types/CrushLine"
import useAutoSaveInBackend from "./hooks/useAutoSaveInBackend"
import useGetCrushEditorValueFromBackend from "./hooks/useGetCrushEditorValueFromBackend"
import useTranslateValue from "./hooks/useTranslateValue"
import { Temporal } from 'temporal-polyfill'
import TaskDropdown from "../TaskDropdown/TaskDrowdown"

// React types lack a data property, which is on the object and is needed. 
// This workaround is to stop typescript complaining, but should be correct
interface CustomNativeEvent {
  data ?: string
}

interface CustomTarget {
  innerHTML ?: string
}

export default function CrushEditor(props: { setLines: Function, lines: CrushLine[] }) {
  const [day, setDay] = React.useState(Temporal.Now.plainDateISO().toString())

  const [value, setValue] = useGetCrushEditorValueFromBackend(day)
  const [autoSaveState, setAutoSaveState] = React.useState("State saved")

  const [taskLinkPopupOpen, setTaskLinkPopupOpen] = React.useState(false)
  const divRef = React.useRef<HTMLDivElement>(null)

  const [showingDropdown, setShowingDropdown] = React.useState(false)
  const [dropdownCoords, setDropdownCoords] = React.useState<{x: number, y: number}>({x: 0, y: 0})

  useTranslateValue(value, props.setLines)
  useAutoSaveInBackend(setAutoSaveState, value, day)

  React.useEffect(() => {
    if (divRef.current) {
      divRef.current.addEventListener('input', onInput)
      return () => {
        divRef.current!.removeEventListener('input', onInput)
      }
    }
  }, [divRef])

  function onInput(this: HTMLDivElement, ev: Event) {
    if (ev.target == null) return
    const target = ev.target as CustomTarget
    handleLastElementIsSlash(ev)
    setValue(target.innerHTML)
  }

  function handleLastElementIsSlash(e: Event) {
    const event = e as CustomNativeEvent
    if (event.data === "[") {
      const clientRec = window.getSelection()!.getRangeAt(0).getBoundingClientRect()
      setShowingDropdown(true)
      setDropdownCoords({x: clientRec.x, y: clientRec.y})
    }
  }

  return (
    <div className="flex flex-col">
      <div 
        contentEditable={true}
        ref={divRef}
        autoCorrect="off"
        spellCheck="false"
        className="crush-editor mx-2 mt-2 h-90v text-xs"
      >
      </div>
      <TaskDropdown isShowing={showingDropdown} dropdownCoords={dropdownCoords} />
      <p>{autoSaveState}</p>
    </div>
  )
}
