import debounce from "../helpers/debounce";
import React from "react";

export default function useAutoSaveInBackend(setAutoSaveState: Function, value: string) {
  const autoSave = React.useMemo(
    () => debounce(() => {
      console.log("Debounced after 1sec of no activity")
      setAutoSaveState("State saved")
    }, 1000),
    []
  );

  React.useEffect(() => {
    setAutoSaveState("Saving...")
    autoSave()
  }, [value])
}