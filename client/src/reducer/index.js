
//ACA CREO MI ESTADO INICIAL - Y HAGO LA LOGICA DE MIS FILTRADOS
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
            case 'FILTER_BY_STATUS':
                const allRecipes = state.recipes
                const statusFiltered = action.payload === 'All' ? allRecipes : allRecipes.filter(p => p.status === action.payload)
                return{
                    ...state,
                    recipes: statusFiltered

                }
                case 'ORDER_BY_NAME':
                    let sortedArr = action.payload === 'asc' ?
                    state.recipess.sort(function(a,b){
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        return 0;
                    }) :
                    state.recipes.sort(function(a,b){
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (a.name < b.name) {
                            return 1;
                        }
                        return 0;
                    })        
                    
                    return{
                       ...state,
                       recipes: sortedArr // paso al estado el ordenamiento
                    }

            default:
                return state;
        }

}

export default rootReducer;