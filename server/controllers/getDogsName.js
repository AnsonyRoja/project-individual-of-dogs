const dotenv = require('dotenv');
const axios = require('axios');
const { Dogs, Temperaments } = require('../src/db');
const { Op } = require('sequelize');

dotenv.config();

const { API_KEY } = process.env;

// Esta función se encarga de buscar los perros en la API y en la base de datos, y devolverlos combinados.

const getDogsName = async (req, res) => {
    try {
        const { name } = req.query;
        // verificamos que se haya proporcionado un nombre en la consulta
        if (!name) return res.status(400).json({ error: 'Name is required' });

        // Busca en la API
        const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`);
        const apiData = apiResponse.data;


        // Filtra los datos de la API para eliminar aquellos sin imagen, temperamentos, altura o peso u otra propiedad que no contenga. 
        const filteredApiData = apiData.filter(dog => dog.image && dog.temperament && dog.height && dog.weight && dog.life_span && dog.reference_image_id && dog.name);


        // Si se proporciona un nombre en la consulta, buscamos solo esa raza 
        const dbDogs = await Dogs.findAll({
            where: {
                name: {
                    //iLike es un operador de sequelize que nos permite buscar por coincidencia de patrones sin importar si es mayuscula o minuscula
                    [Op.iLike]: `%${name}%`,
                }
            },
            // incluimos los temperamentos asociados a cada raza de perro
            include: Temperaments,
        });


        //transformamos en una lista de objetos llamada dbDogs y crea una nueva lista de objetos llamada dogsWithTemperaments utilizando el metodo de mapeo 

        const dogsWithTemperaments = dbDogs.map(dog => {
            //  extraemos los nombres de los temperamentos asociados a cada raza de perro
            const temperaments = dog.Temperaments.map(temp => temp.name);
            // cada objeto  de la lista dogsWithTemperaments tiene las propiedades que necesitamos para mostrar en el front
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image,
                height: dog.height,
                weight: dog.weight,
                life_span: dog.life_span,
                reference_image_id: dog.reference_image_id,
                temperaments: temperaments,
            };
        });


        // Combina los resultados de la API y la base de datos
        const combinedResults = [...filteredApiData, ...dogsWithTemperaments];

        // validamos que la lista de resultados combinados no este vacia
        if (combinedResults.length === 0) {
            return res.status(404).json({ error: 'Races Not Found' });
        }
        // finalmente devolvemos los resultados combinados por medio de la respuesta del servidor 
        res.status(200).json(combinedResults);

    } catch (error) {
        // si hay un error sera capturado por el catch y devuelto al cliente
        return res.status(500).json({ error: error.message });
    }
};

// El código de estado HTTP 304 significa "No modificado" (Not Modified). Este código se devuelve cuando el cliente realiza una solicitud condicional, como una solicitud GET con un encabezado If-None-Match o If-Modified-Since, y el servidor determina que el recurso no ha cambiado desde la última vez que el cliente lo solicitó. En lugar de enviar el recurso nuevamente en el cuerpo de la respuesta, el servidor devuelve una respuesta 304 para indicar al cliente que puede usar la copia en caché que ya tiene.

module.exports = getDogsName;
