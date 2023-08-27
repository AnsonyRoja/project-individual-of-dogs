const axios = require('axios');
const { API_KEY } = process.env;

const getDogs = async (req, res) => {
    try {
        // Obtén los datos de la API
        const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const apiData = apiResponse.data;

        // Filtra los datos de la API para eliminar aquellos sin imagen, temperamentos, altura o peso
        const filteredApiData = apiData.filter(dog => {
            const weightMetric = parseFloat(dog.weight.metric);
            const weightImperial = parseFloat(dog.weight.imperial);

            // Verificar si weightMetric y weightImperial son números válidos
            const areValidWeights = !isNaN(weightMetric) && !isNaN(weightImperial);

            // Filtrar el resto de las propiedades, si también existen 
            return (
                areValidWeights &&
                dog.image &&
                dog.temperament &&
                dog.height &&
                dog.weight &&
                dog.life_span &&
                dog.reference_image_id &&
                dog.name
            );
        });


        // respuesta de la api con todas las razas existentes 
        res.status(200).json(filteredApiData);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = getDogs;
