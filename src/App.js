import './App.css';
import FormPage from './pages/FormPage/FormPage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import SignUpForm from './components/Auth/SignUpForm/SignUpForm';
import LoginForm from './components/Auth/LoginForm/LoginForm';
import SummaryPage from './pages/SummaryPage/SummaryPage';
import Home from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {


  return (
    <div className="App">
    <Router>
    <Header />
        <Routes>
          <Route path="/home" element={ <Home />}/> 
          <Route path="/" element={<SignUpForm />}/>
          <Route exact path="/form" element={<FormPage/>}/>
          <Route path="/summary" element={<SummaryPage/>}/>
          <Route path="/signUp" element={<SignUpForm/>}/>
          <Route path="/login" element={<LoginForm/>} />
        </Routes>  
    </Router>
    </div>
  );
}

export default App;
