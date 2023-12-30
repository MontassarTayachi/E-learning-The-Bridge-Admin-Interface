import './App.css';
import Sidebar from './components/SideBar';
import AjouterCour from './components/AjouterCour'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cours } from './components/MenuCour';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      < Sidebar >
      
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/Menu" element={<Home  />} />
        <Route path="/AjouterCour" element={<AjouterCour  />} />
        <Route path="/Cours" element={<Cours  />} />
      </Routes>
     
   </Sidebar>
   </BrowserRouter>
   
    </div>
  );
}

export default App;
