import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen'
import CreateBoard from './Components/CreateBoard';
import DeleteConfirm from './Components/DeleteConfirm';
import Board from './Components/Board';
import Task from './Components/Task';
import EditTask from './Components/EditTask';
import AddTask from './Components/AddTask';
import EditBoardModal from './Components/EditBoardModal';
import LoginModal from './Components/LoginModal';
import RegisterModal from './Components/RegisterModal';


function App() {
  return (
    <Router>

      <Routes>
        <Route path='/' element={ <HomeScreen /> }>
          <Route path='/login' element={ <LoginModal />} />
          <Route path='/register' element={ <RegisterModal />} />

          <Route path='board/:id' element={ <Board />} >
            <Route path='delete' element={ <DeleteConfirm /> }/>
            <Route path='edit' element={ <EditBoardModal /> }/>
            <Route path='task/:taskID' element={ <Task />}/>
            <Route path='task/:taskID/edit' element={ <EditTask />}/>
            <Route path='task/:taskID/delete' element={ <DeleteConfirm />}/>
            <Route path='new-task' element={ <AddTask />} />
          </Route>

          <Route path='board/create' element={ <CreateBoard/>}/>
          
        </Route>
        

      </Routes>
    </Router>

    
  );
}

export default App;
