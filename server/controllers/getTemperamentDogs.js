const { Dogs, Temperaments } = require('../src/db');

// Funcion para obtener todos los perros y sus temperamentos de la base de datos
const getTemperamentsDogs = async (req, res) => {
    try {

        // declaramos una variable para guardar las razas y los temperamentos de la base de datos 
        let dogs;

        // Si se proporciona una ID en la consulta, buscamos solo ese perro
        dogs = await Dogs.findAll({
            // incluimos los temperamentos de los perros
            include: Temperaments,
        });

        // mapeamos los datos de los perros y sus temperamentos para enviarlos al front 
        const dogsWithTemperaments = dogs.map(dog => {
            // declaramos una variable para guardar los temperamentos de cada perro
            const temperaments = dog.Temperaments.map(temp => temp.name);
            //retornamos por ultimo las key:value de la raza  y sus temperamentos
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

        //retornamos la respuesta con un status 200, el objeto final con los datos de las razas y sus temperamentos 

        return res.status(200).json(dogsWithTemperaments);

    } catch (error) {

        // retornamos un error si hay algun problema en la busqueda de los perros y sus temperamentos

        return res.status(500).json({ error: 'Error al buscar perros y temperamentos' });

    }
};

module.exports = getTemperamentsDogs;
