const {Router} = require('express');

// INSTALO CON NPM AXIOS Y Agrego Axios para uso futuro, es mas facil q con FETCH
const axios = require('axios'); // aca importo axios despues del npm i axios

//const {Sequelize} = require ('sequelize');

//ME TRAIGO LAS TABLAS DE LA DB
const { Recipe, Diet } = require('../db.js'); // AGREGO DE LA DB RECIPES_TYPES para cuando necesite hacer las relaciones
const {DB_API} = process.env;

// Importar todos los routers; // Ejemplo: const authRouter = require('./auth.js'); 
//---- ACA DEFINO LAS CONSTANTES PARA EL MIDDLEWARE EN LA LINEA 95
const recipesRouter = require("./recipes");
const dietsRouter = require("./diets");

 
//TRAIGO SEQUELIZE PARA LOS OPERADORES QUE NECESITE
const {Op} = require('sequelize');// EN Op traemos muchos metodos de sequelize que nos pueden servir de operadores

// // IMPORTO LOS ROUTERS 
// const getall = require('./getAll') lo usa fede panella yo no

//defino el middleware
// router.use('/recipes');
// router.use('/types');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//---------------------------------------------------------------------------------
//trabajar de manera asincrona y aca 
//ME TRAIGO LA INFO DE LA API / LA PRUEBO CON POSTMAN
    // GET https://api.spoonacular.com/recipes/complexSearch
    // Para obtener mayor información sobre las recetas, 
    // como por ejemplo el tipo de dieta deben agregar el flag: 
    // &addRecipeInformation=true a este endpoint    
    const getApiInfo = async () => {        
                const apiHtml = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=e52d0eec39494ada9566cf2aff44255e&addRecipeInformation=true&number=100');
            
                                        // ('https://api.spoonacular.com/recipes/complexSearch',{
                                        // headers: {'x-api-key': `${DB_API}`}}); 
                                        //('https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_API}&addRecipeInformation=true&number=100');
                                      //('https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_API}&addRecipeInformation=true&number=100');
                                      //https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_API}&number=100
                                      // para verlo en el navegador va sin $ y sin llaves y  en el código con $ y llaves
                                      //https://api.spoonacular.com/recipes/complexSearch?apiKey=dcdefe9c20dd489db36f3ac43aaa913a&addRecipeInformation=true

            //CREO UN OBJETO Y MAPEO LO Q NECESITO PARA MI APP                                       
            const apiInfo = apiHtml.data.results.map(p => {
                return {
                    id: p.id,
                    name: p.title,
                    image: p.image,
                    summary: p.summary,
                    spoonacularScore: p.spoonacularScore,
                    healthScore: p.healthScore,
                    analyzedInstructions: p.analyzedInstructions
                    .map(a => a.steps.map(b => b.step))
                    .flat(1)
                    .join(""),
                    diet: p.diets //map(diet => diet)                     
                };
        });return apiInfo;
    };

//ME TRAIGO LA INFO DE LA DB
const getDbInfo = async () => {
    return await Recipe.findAll({
            include:{
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        })
    };

// CONCATENO LA INFO DE LA API Y LA DB
const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();    
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;    
}

//-- defino el middleware
router.use("/recipes", recipesRouter);
router.use("/diets", dietsRouter);
// //-------------------------------------------------------------

// ACA GENERO TODOS LOS GET   (/recipes) (/types) y por (/recipes/:id)

// GET POR RECETAS
router.get ('/recipes', async (req, res) =>{    
    const name = req.query.name // ESTE REQ BUSCA SI HAY POR NAME LA BUSQUEDA
    let recipesAll = await getAllRecipes();
    //ACA COMPARAMOS LA BUSQUEDA CON EL NAME
    if(name){
        let recipesName = await recipesAll.filter(p => p.name.toLowerCase().includes(name.toLowerCase())) //tolower case hace que la busqueda en minus o mayusc no afecte al resultado de la busqueda
        recipesName.length? // sirve para preguntar si trajo algo la busqueda
        res.status(200).send(recipesName) :
        res.status(400).send('No existe la Receta que Busca.');
    } else {
        res.status(200).send(recipesAll)
    }
})

//GET POR DIETS (es por tipos de Dietas)
router.get('/diets', async (req, res) =>{
    const apiHtml = await axios ('https://api.spoonacular.com/recipes/complexSearch?apiKey=e52d0eec39494ada9566cf2aff44255e&addRecipeInformation=true&number=100');
    const diet = apiHtml.data.map(p => p.diet)

    //const diets = diet.toString().trim().split(/\s*,\s*/);
    const splitdiet = await diet.filter(p => p.length > 0);
    
    //console.log (splittype) //puedo comprobar lo q trae    

    splitdiet.forEach(p => {
        //ME TRAIGO LOS TYPOS DE DIETAS DE LA BASE DE DATOS LOS BUSCA O CREA SI NO EXISTEN
        if (p!==undefined) Diet.findOrCreate({where: {name: p}})});
    const allDiet = await Diet.findAll();
    res.send(allDiet);
})

// GET POR :ID 
router.get('/recipes/:id', async (req, res) => {
    const id = req.params.id;
    const recipesTotal = await getAllRecipes()
    if (id){
        let recipeId = await recipesTotal.filter(p => p.id == id)
        recipeId.length?
        res.status(200).send(recipeId) :
        res.status(404).send('no se encontro la Receta Buscada')
    }
});


// *** POST ** PARA AGREGAR NUEVA RECETA

router.post('/recipes', async (req, res) => {
    /// ** traigo lo q me pide por Body ** 
    let {  
          name,          
          resumePlate,
          puntuation,
          healthyLevel,
          stepToStep,
          diet,
          image,
          createInDb,
    } = req.body

    let recipeCreated = await Recipe.create ({
          name,          
          resumePlate,
          puntuation,
          healthyLevel,
          stepToStep,
          diet,
          image,
          createInDb,
    })
    let dietDb = await Diet.findAll({
        where: {name : diet}
    })
    recipeCreated.addDiet(dietDb)
    res.send('Receta Creada Exitosamente')
});



module.exports = router;
