import React  from 'react';
import {Link} from 'react-router-dom';

import Button from '@material-ui/core/Button'; //npm i @material-ui/core
import './LandingPage.css'; // importo los styles de mi landinpage.css

export default function LandingPage(){
    return(
        <div>   
            <h1>Bienvenidos a mi Aplicacion de Comidas</h1>
            
            <Link to = '/home'>     
            <img className="logo" src="https://cdn.pixabay.com/photo/2014/04/02/10/48/food-304597_960_720.png" alt="to home" />
                {/* <img className="logo" src="https://fondosmil.com/fondo/35731.jpg" alt="to home" /> */}
                <br /><br /><br />   
                {/* <Button variant="contained" color="primary">INGRESAR</Button>          */}
            </Link>

        </div>
    )
}