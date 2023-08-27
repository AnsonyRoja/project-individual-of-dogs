require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Temperaments } = require("../src/db");

// creamos la funcion asincrona para obtener los temperamentos de la api externa y de la base de datos
const getTempereaments = async (req, res) => {
    try {
        // Obtener temperamentos de la API, y le agregamos el header con la api key para poder hacer la peticion
        const response = await axios.get('https://api.thedogapi.com/v1/breeds', { headers: { 'x-api-key': API_KEY } });
        // si la respuesta es correcta       
        if (response.status === 200) {
            // declaramos una variable para guardar los datos de la respuesta
            const breedsData = response.data;
            // declaramos una variable para guardar los temperamentos de la api externa con un set para evitar duplicados
            const apiTemperaments = new Set();
            // recorremos los datos de la respuesta
            breedsData.forEach(breed => {
                // si el temperamento existe en la raza lo agregamos al set
                if (breed.temperament) {
                    // declaramos una variable para guardar los temperamentos de cada raza utilizando el metodo split del array para separar los temperamentos
                    const temperamentList = breed.temperament.split(', ');
                    // recorremos los temperamentos de cada raza y los agregamos al set
                    temperamentList.forEach(temperament => apiTemperaments.add(temperament));
                }

            });

            // Obtener temperamentos de la base de datos
            const dbTemperaments = await Temperaments.findAll();
            // declaramos una variable para guardar los nombres de los temperamentos de la base de datos
            const dbTemperamentNames = dbTemperaments.map(temp => temp.name);

            // Combinar los temperamentos sin duplicados 
            const allTemperaments = [...apiTemperaments, ...dbTemperamentNames];
            const uniqueTemperaments = new Set(allTemperaments);

            // Crear o encontrar los temperamentos en la base de datos
            const savedTemperaments = [];
            // utilizamos un for of para recorrer los temperamentos unicos
            for (const temperament of uniqueTemperaments) {
                //extraemos el primer elemento del array que devuelve el metodo findOrCreate, recordemos que nos arroja un array 
                // donde el primer elemento es el objeto y el segundo es un booleano que nos indica si se creo o no el objeto
                const [savedTemperament] = await Temperaments.findOrCreate({
                    where: {
                        name: temperament
                    }
                });

                // finalmente pushamos el objeto que arroja el metodo findOrCreate al array que vamos a devolver como respuesta
                savedTemperaments.push(savedTemperament);
            }
            // devolvemos los temperamentos en una respuesta del servidor en formato, json, con un status 200
            return res.status(200).json(savedTemperaments);
        } else {
            // si la respuesta no es correcta, arrojamos un error
            throw Error('Error al obtener los temperamentos de la API');
        }
    } catch (error) {
        // si hay un error, lo devolvemos en una respuesta del servidor en formato, json, con un status 500
        res.status(500).json({ message: error.message });
    }
}

module.exports = getTempereaments;
