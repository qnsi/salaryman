import React from "react";
import { MainView } from "../App";

export function usePersistTab(setView: Function) {
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab === null || tab === "tasks") {
      setView(MainView.Tasks)
    } else if (tab === "log") {
      setView(MainView.TaskLog)
    } else if (tab === "task") {
      setView(MainView.Task)
    } else if (tab === "planner") {
      setView(MainView.CrushEntropy)
    } else if (tab === "kanban") {
      setView(MainView.Kanban)
    } else {
      setView(MainView.NoContent)
    }
  }, [])
}