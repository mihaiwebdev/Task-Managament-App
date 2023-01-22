import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen'
import CreateBoard from './Components/CreateBoard';
import Board from './Components/Board';
import Task from './Components/Task';
import EditTask from './Components/EditTask';
import AddTask from './Components/AddTask';

function App() {
  return (
    <Router>

      <Routes>
        <Route path='/' element={ <HomeScreen /> }>

          <Route path='board/:id' element={ <Board />} >
            <Route path='task/:taskID' element={ <Task />}/>
            <Route path='task/:taskID/edit' element={ <EditTask />}/>
            <Route path='new-task' element={ <AddTask />} />
          </Route>

          <Route path='board/create' element={ <CreateBoard/>}/>
          
        </Route>
        

      </Routes>
    </Router>

    
  );
}

export default App;
