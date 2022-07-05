import React from 'react';
import './App.css';
import { usePersistTab } from './hooks/usePersistTab';
import Navbar from './views/Navbar';
import Sidebar from './views/Sidebar';
import TaskLog from './views/tasks/TaskLog/TaskLog';
import TaskView from './views/tasks/TaskView/TaskView';
import { ThingView } from './views/things/ThingView';
import IndividualTask from "./views/tasks/IndividualTask/IndividualTask"

export enum MainView {
  Tasks,
  Task,
  Things,
  TaskLog,
  NoContent
}

function App() {
  const [view, setView] = React.useState(MainView.Tasks)

  usePersistTab(setView)

  var viewComponent = <TaskView />
  if (view === MainView.TaskLog) {
    viewComponent = <TaskLog />
  } else if (view === MainView.Task) {
    viewComponent = <IndividualTask />
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
