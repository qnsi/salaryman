import React from 'react';
import './App.css';
import { usePersistTab } from './hooks/usePersistTab';
import Navbar from './views/Navbar';
import Sidebar from './views/Sidebar';
import TaskLog from './views/tasks/TaskLog/TaskLog';
import TaskView from './views/tasks/TaskView/TaskView';
import IndividualTask from "./views/tasks/IndividualTask/IndividualTask"
import CrushEntropy from './views/CrushEntropy/CrushEntropy';
import Kanban from './views/Kanban/Kanban';

export enum MainView {
  Tasks,
  Task,
  Kanban,
  CrushEntropy,
  TaskLog,
  NoContent
}

function App() {
  const [view, setView] = React.useState(MainView.Tasks)

  usePersistTab(setView)

  var viewComponent = <TaskView initialTasks={[]} controlledComponent={false} />
  if (view === MainView.TaskLog) {
    viewComponent = <TaskLog />
  } else if (view === MainView.Task) {
    viewComponent = <IndividualTask />
  } else if (view === MainView.CrushEntropy) {
    viewComponent = (
      <div className="crushentropy grow basis-2/3">
        <CrushEntropy />
      </div>
    )
  } else if (view === MainView.Kanban) {
    viewComponent = <Kanban />
  } else if (view === MainView.NoContent) {
    viewComponent = <div>404</div>
  } 
  return (
    <div className="App">
      <Navbar />
      <div className="mainview">
        <Sidebar setView={setView}/>
        {viewComponent}
      </div>
    </div>
  );
}

export default App;
