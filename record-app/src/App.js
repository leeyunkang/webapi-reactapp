import './App.css';
import RecordList from './component/RecordList';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './component/LoginPage';
import RegisterPage from './component/RegisterPage';
import RecordHeader from './component/RecordHeader'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className='App'>
      <div className='container'>
      <RecordHeader />
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage/>} />
          <Route path='/record' element={<RecordList/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route>404 Not Found!</Route>
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
