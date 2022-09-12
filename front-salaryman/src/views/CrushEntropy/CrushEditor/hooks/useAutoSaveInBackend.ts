import debounce from "../helpers/debounce";
import React from "react";
import { saveCrushEditor } from "../../../../api/saveCrushEditor";

export default function useAutoSaveInBackend(setAutoSaveState: Function, value: string) {
  const autoSave = React.useMemo(
    () => debounce(() => {
      saveCrushEditor(value).then((resp) => {
        setAutoSaveState("State saved")
      }).catch((err) => {
        setAutoSaveState("Error" + err)
      })
    }, 1000),
    []
  );

  React.useEffect(() => {
    setAutoSaveState("Saving...")
    autoSave()
  }, [value])
}