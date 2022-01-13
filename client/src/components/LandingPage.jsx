import React  from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <h1>Bienvenidos a mi Aplicacion de Comidas</h1>
            <br /><br /><br />
            <Link to = '/home'>
                <img className="logo" src="https://c.wallhere.com/photos/2a/5e/food_vegetables_tomatoes_salad_Pepper_Garlic_Paprika-1949021.jpg!d" alt="to home" />                
                {/* https://fondosmil.com/fondo/35731.jpg */}
                {/* <Button>INGRESAR</Button> */}
            </Link>
        </div>
    )
}