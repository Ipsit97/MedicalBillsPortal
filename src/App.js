import './App.css';
import FormPage from './pages/FormPage/FormPage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import SummaryPage from './pages/SummaryPage/SummaryPage';
import Home from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <div className="App">
    <Router>
    <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route exact path="/form" element={<FormPage/>} />
          <Route path="/summary" element={<SummaryPage/>} />
        </Routes>  
    </Router>
    </div>
  );
}

export default App;
