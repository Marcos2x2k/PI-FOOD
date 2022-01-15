import './App.css';
//IMPORTO ROUTES Y ROUTER, SWITCH EN ESTA VERSION YA NO ANDA SOLO ANDA Routes/BrowserRouter
import {Routes, Route, BrowserRouter } from 'react-router-dom'; 

// IMPORTO LOS COMPONENTES
import LandingPage from './components/LandingPage.jsx'
import Home from './components/Home.jsx';
import RecipeCreate from './components/RecipeCreate.jsx';



//function App() {   // ME RESULTA MAS FACIL CON CONSTANTES
const App = () => {
  return (
    <BrowserRouter>
    <div className="App">      
      <h1>P.I. Henry Food</h1>
      <h3>Marcos Dacunda FT-19a</h3>
      <Routes>
      {/* // ACA RENDEDIZAMOS LAS RUTAS */}
        <Route exact path='/' element={<LandingPage/>}/>
        <Route exact path='/Home' element={<Home/>}/>
        {/* <Route exact path='/home/:id' element={<Detail/>}/> */}
        <Route path='/recipes' element={<RecipeCreate/>}/>
      </Routes>   
    </div>
    </BrowserRouter>
  );
}

export default App;
