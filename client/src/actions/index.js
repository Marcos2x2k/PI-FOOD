import axios from 'axios';
export const SET_PAGE = 'SET_PAGE';

//aca se realiza la coneccion de back con el front
export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/recipes",{});
    return dispatch({
        type: 'GET_RECIPES',
        payload: json.data
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