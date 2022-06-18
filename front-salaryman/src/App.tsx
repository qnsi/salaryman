import React from 'react';
import './App.css';
import { usePersistTab } from './hooks/usePersistTab';
import Navbar from './views/Navbar';
import Sidebar from './views/Sidebar';
import TaskView from './views/tasks/TaskView/TaskView';
import { ThingView } from './views/things/ThingView';

export enum MainView {
  Tasks,
  Things
}

function App() {
  const [view, setView] = React.useState(MainView.Tasks)

  usePersistTab(setView)

  var viewComponent = <TaskView />
  if (view === MainView.Things) {
    viewComponent = <ThingView />
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
