import React from "react";
import Button from '@material-ui/core/Button'; //npm i @material-ui/core

//IMPORTO PORQUE USAMOS HOOKS
import { useState, useEffect, Fragment } from 'react'; //Fragment es como un div para envolver hijos div en app
import {useDispatch, useSelector} from 'react-redux'
import {getRecipes, filterRecipesByStatus, filterCreated, orderByName, setPage} from '../actions'; // Siempre importo las acciones nuevas

//LINK nos sirve para poder movernos por nuestra aplicación 
//más fácilmente en lugar de tener que cambiar la URL manualmente en el navegador.
import {Link} from 'react-router-dom';

//ME IMPORTO EL COMPONENTE Card y renderizo en linea 
import Card from './Card';

//IMPORTAMOS EL PAGINADO
import Paginado from './Paginado';

export default function Home () {

    const dispatch = useDispatch(); // PARA USAR HOOKS
    const allRecipes = useSelector((state) => state.recipes) //HOOKS es lo mismo q maps.state.props
    
    //CREO VARIOS ESTADOS LOCALES y lo seteo en 1- ACA CALCULO LAS CARD POR PAGINAS
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9) //DEFINO LAS 9 RECETAS POR PAGE Q PIDEN
    const [orden, setOrden] = useState(''); // es un estado local q arranca vacio para el Asc y Desc Order
    const indexOfLastRecipe = currentPage * recipesPerPage // 6
    const indexOfFirstRecipe     = indexOfLastRecipe - recipesPerPage // 0
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe) 

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    //TRAIGO DEL ESTADO LAS RECETAS CUANDO EL COMPONENTE SE MONTA
    useEffect (() => {
        dispatch(getRecipes()) // ACCION QUE ME TRAE LAS RECETAS
    },[dispatch])

    // ORDENAMIENTO DE PAGINA ASCENDENTE O DESCENDENTE
    function handleSort(p){
        p.preventDefault();
        dispatch(orderByName(p.target.value)) //despacho la accion
        setCurrentPage(1); //ordenamiento seteado en pagina 1
        setOrden(`Ordenado ${p.target.value}`)  //es un estado local vacio, lo uso para modif estado local y renderize
    };
// PARA RESETEAR AL TOCAR EL BOTON volver a cargar las recetas
function handleClick(p){
    p.prevent.default();  //PREVENTIVO PARA Q NO RECARGUE TODA LA PAGINA
    dispatch(getRecipes());
}

//Aca aplico lógica, esta funcion le paso en el select de Types NE HOME -> ALL VEGETARIAN ETC
function handleFilterStatus(p){ // ESTE ONCHANGE LO PONGO EN EL SELECT ACA LINEA 76
    dispatch(filterRecipesByStatus(p.target.value))
}


// RENDERIZADOS
// Aca renderizamos un Div
    return( 
        <div> 
            <Link to='/recipe'> 
              <Button variant="contained" color="primary"> CREAR RECETA </Button>
            </Link>
            <h2> </h2>            
            <Button  variant="contained" color="secondary" href="/">
                Ir a Landing Page
            </Button>     
            <br /><br /> 
            {/* //ACA PASO PARA RESETEAR LAS RECETAS */}
            <button onClick={ p => {handleClick(p)}}> 
                Volver a cargar todas las Recetas
            </button>     
            <br /><br />   
       <div>
            
            {/* ACA DEFINO EL SELECT PARA EL ORDENAMIENTO */}
            <select onChange={p => handleSort(p)}>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
            <select onChange={(p) => handleFilterStatus(p)}>
                <option value=''> -- Select --</option>
                <option value="Gluten Free">Gluten Free</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Pescetarian">Pescetarian</option>
                <option value="Paleo">Paleo</option>
               <option value="Primal">Primal</option>
               <option value="Whole 30">Whole 30</option>
            </select>
            <select>
                <option value='Todos'>Todos</option>
                <option value='Creados'>Base de Datos</option>
                <option value='Api'>A P I</option>     
            </select>
            <Paginado recipesPerPage = {recipesPerPage}
                allRecipes={allRecipes.length}
                paginado = {paginado}
            />

                {/* ACA NE TRAIGO LA CARD PARA RENDERIZAR con los datos que quiero */}
                {currentRecipes?.map( (p) =>{ // CON ? PREGUNTA SI EXISTE Y DESPUES MAPEA
                    return(
                    <div>
                        <Link to = {'/home/' + p.id}>
                        {/* //pase por props .name .img .resumePlate  */}
                            <Card name={p.name} image={p.image} spoonacularScore={p.spoonacularScore}/> 
                        </Link>
                    </div>
                )
            })}
       </div>
       </div>
    )}
