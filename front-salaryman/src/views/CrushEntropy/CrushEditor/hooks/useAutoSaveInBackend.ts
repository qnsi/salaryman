import debounce from "../helpers/debounce";
import React from "react";
import { saveCrushEditor } from "../../../../api/crushEntropy/saveCrushEditor";

export default function useAutoSaveInBackend(setAutoSaveState: Function, value: string, day: string) {
  const valueRef = React.useRef(value)

  const autoSave = React.useMemo(
    () => debounce(() => {
      saveCrushEditor(valueRef.current, day).then((resp) => {
        setAutoSaveState("State saved")
      }).catch((err) => {
        setAutoSaveState("Error" + err)
      })
    }, 1000),
    []
  );

  React.useEffect(() => {
    valueRef.current = value
    setAutoSaveState("Saving...")
    autoSave()
  }, [value])
}