
//ACA CREO MI ESTADO INICIAL
const initialState = {
    recipes : []
}

function rootReducer(state =  initialState, action){
        switch(action.type){
            case 'GET_RECIPES':
                return {
                    ...state, //GUARDO MI ESTADO SIEMPRE
                    recipes: action.payload
                }
                default:
                    return state;
        }

}

export default rootReducer;