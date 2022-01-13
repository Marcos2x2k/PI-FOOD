import './App.css';
//IMPORTO ROUTES Y ROUTER, SWITCH EN ESTA VERSION YA NO ANDA SOLO ANDA Routes/BrowserRouter
import {Routes, Route } from 'react-router-dom'; 

// IMPORTO LOS COMPONENTES
import LandingPage from './components/LandingPage.jsx'
import Home from './components/Home.jsx';
import RecipeCreate from './components/RecipeCreate.jsx';



// function App() {   // ME RESULTA MAS FACIL CON CONSTANTES
const App = () => {
  return (
    <div className="App">      
      <h1>PROYECTO Henry Food By M.A.D.</h1>      
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route exact path='/Home' element={<Home/>}/>
        {/* <Route exact path='/home/:id' element={<Detail/>}/>
        <Route path='/recipes' element={<RecipeCreate/>}/>  */}
      </Routes>   
    </div>
  );
}

export default App;
