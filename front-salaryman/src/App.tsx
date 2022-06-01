import './App.css';
import Navbar from './views/Navbar';
import Sidebar from './views/Sidebar';
import TaskView from './views/tasks/TaskView/TaskView';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="mainview">
        <Sidebar />
        <TaskView />
      </div>
    </div>
  );
}

export default App;
