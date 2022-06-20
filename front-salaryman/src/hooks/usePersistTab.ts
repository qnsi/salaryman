import React from "react";
import { MainView } from "../App";

export function usePersistTab(setView: Function) {
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab === null || tab === "tasks") {
      setView(MainView.Tasks)
    } else if (tab === "things") {
      setView(MainView.Things)
    } else {
      setView(MainView.NoContent)
    }
  }, [])
}