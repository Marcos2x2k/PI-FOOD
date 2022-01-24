import React from 'react';
import './Card.css'; // importo los styles de mi Card.css

export default function Card({name, image, resumePlate}){
    return (
        <div>
            <h3 class="heading">{name}</h3>
            <h3 class="heading">{resumePlate}</h3>
            {/* <img src={image} alt="imagen no lista" with="200px" height="250px" /> */}
            {/* <h5>{puntuation}</h5>
            <h5>{healthyLevel}</h5> */}
            <img className="card" src={image} alt="img not found" width = "400px" height="270px"/>
            
        </div>
    )
}





