import react from 'react';

export default function Paginado({recipesPerPage, allRecipes, paginado}){
    const pageNumber = []

    for (let i=1; i<=Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumber.push(i)
    }
    return (
        <nav> 
            <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent:'center',
                    alingItems: 'center',
                    margin: '5px',                    
                    decoration: 'none'
                    
                }}
                className='paginado'> 
                    { pageNumber && 
                    pageNumber.map(number =>(
                    <ul 
                        className='number' key={number}>
                        <button onClick={() => paginado (number)}>{number}</button>
                    </ul>
                    ))}
            </div>
            
        </nav>
    )
}