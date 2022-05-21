import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TaskView from './components/TaskView';

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
