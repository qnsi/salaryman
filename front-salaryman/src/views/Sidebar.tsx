import { MainView } from "../App"

export default function Sidebar(props: {setView: Function}) {
  return (
    <div className="sidebar">
      <a onClick={() => window.location.href = "/?tab=tasks"}>Tasks</a>
      <br/>
      <a onClick={() => window.location.href = "/?tab=log"}>TaskLog</a>
    </div>
  )
}