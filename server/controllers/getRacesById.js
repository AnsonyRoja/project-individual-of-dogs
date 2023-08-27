require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');


// Funcion para obtener una raza por id de la api externa thedogapi 

const getRacesById = async (req, res) => {

    try {
        // obtenemos el id de la raza de los parametros de la url
        const { idRaza } = req.params;
        // si no se envia el id de la raza retornamos un error
        if (!idRaza) return res.status(400).json({ message: 'id is required' });
        // hacemos la peticion a la api externa
        const { data } = await axios.get(`https://api.thedogapi.com/v1/images/${idRaza}?api_key=${API_KEY}`);
        // retornamos la respuesta de la api externa con los datos de la raza solicitada
        return res.status(200).json(data);

    } catch (error) {
        // si hay un error en la peticion retornamos un error
        return res.status(404).json({ message: error.message });

    }

}


module.exports = getRacesById;