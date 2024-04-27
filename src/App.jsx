import './App.scss';
import { Routes, Route } from "react-router-dom";
import CompleteTask from './pages/CompleteTask/CompleteTask';
import { Authentication, Header } from './components';
import Home from './pages/home';

function App() {

  return (
    <div className='main-body'>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task-complete" element={<CompleteTask />} />
      <Route path="/auth" element={<Authentication />} />
    </Routes>
    </div>
  )
}

export default App
