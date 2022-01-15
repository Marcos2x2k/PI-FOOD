const {Router} = require('express');

// INSTALO CON NPM AXIOS Y Agrego Axios para uso futuro, es mas facil q con FETCH
const axios = require('axios'); // aca importo axios despues del npm i axios

//const {Sequelize} = require ('sequelize');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//ME TRAIGO LAS TABLAS DE LA DB
const { Recipe, Type } = require('../db.js'); // AGREGO DE LA DB RECIPES_TYPES para cuando necesite hacer las relaciones
const {API_KEY} = process.env;

//---- ACA DEFINO LAS CONSTANTES PARA EL MIDDLEWARE EN LA LINEA 95
const recipesRouter = require("./recipes");
const typesRouter = require("./types");

 
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
                                        // headers: {'x-api-key': `${API_KEY}`}}); 
                                        //('https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100');
                                      //('https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100');
                                      //https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100
                                      // para verlo en el navegador va sin $ y sin llaves y  en el código con $ y llaves
                                      //https://api.spoonacular.com/recipes/complexSearch?apiKey=dcdefe9c20dd489db36f3ac43aaa913a&addRecipeInformation=true

            //CREO UN OBJETO Y MAPEO LO Q NECESITO PARA MI APP                                       
            const apiInfo = apiHtml.data.results.map(p => {
                return {
                    id: p.id,
                    name: p.title,
                    image: p.image,
                    resumen: p.summary,
                    puntuacion: p.spoonacularScore,
                    saludableLvl: p.healthScore,
                    stepByStep: p.analyzedInstructions
                    .map(a => a.steps.map(b => b.step))
                    .flat(1)
                    .join(""),
                    type: p.diets.map(diet => diet)                     
                };
        });return apiInfo;
    };

//ME TRAIGO LA INFO DE LA DB
const getDbInfo = async () => {
    return await Recipe.findAll({
            include:{
                model: Type,
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
router.use("/types", typesRouter);
//-------------------------------------------------------------

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

//GET POR TYPES (es por tipos de Dietas)
router.get ('/types', async (req, res) =>{
    const apiHtml = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=e52d0eec39494ada9566cf2aff44255e&addRecipeInformation=true&number=100');
    const type = apiHtml.data.map(p => p.type)

    const types = type.toString().trim().split(/\s*,\s*/);
    const splittype = await types.filter(p => p.length > 0);
    
    console.log (splittype) //puedo comprobar lo q trae    

    splittype.forEach(p => {
        //ME TRAIGO LOS TYPOS DE DIETAS DE LA BASE DE DATOS LOS BUSCA O CREA SI NO EXISTEN
        if (p!==undefined) Type.findOrCreate({where: {name: p}})});
    const allType = await Type.findAll();
    res.send(allType);
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
          image,
          resumePlate,
          puntuation,
          healthyLevel,
          stepToStep,
          type,
          createInDb,
    } = req.body

    let recipeCreated = await Recipe.create ({
          name,
          image,
          resumePlate,
          puntuation,
          healthyLevel,
          stepToStep,
          type,
          createInDb,
    })
    let typeDb = await Type.findAll({
        where: {name : type}
    })
    recipeCreated.addType(typeDb)
    res.send('Receta Creada Exitosamente')
});



module.exports = router;
