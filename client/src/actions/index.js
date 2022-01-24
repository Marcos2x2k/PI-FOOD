// ACA REALIZO LOS FILTRADOS es decir la ACCION (despachar un tipo)
//LA LOGICA LA HAGO EN REDUCER o COMPONENTES, YO USO REDUCER



import axios from 'axios';
export const SET_PAGE = 'SET_PAGE';

//aca se realiza la coneccion de back con el front LINEA 7 y 8
    export function getRecipes(){
        return async function(dispatch){
            var json = await axios.get("http://localhost:3001/recipes") //,{}); // el get lo hace por default pero lo agrego
            return dispatch({
            type: 'GET_RECIPES',
            payload: json.data   // ACA CREE MI RUTA DE GET A RECIPES
        })
    }};

    export function getNameRecipes(name){
        return async function (dispatch){
            try{
            var json = await axios.get("http://localhost:3001/recipess?name=" + name);
            return dispatch({
                type: "GET_NAME_RECIPES",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
    }}};

    export function filterRecipesByStatus(payload){
        console.log(payload)
        return{
            type: 'FILTER_BY_STATUS',
            payload 
        }
    }

    //hacemos la accion de filtrar por API o Bdatos // payload trae el value de la accion q elija
export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
};
export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}