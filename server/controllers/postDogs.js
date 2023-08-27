const { Dogs, Temperaments } = require('../src/db');
// Funcion para crear un nuevo perro
const postDogs = async (req, res) => {
    try {
        // Desestructuramos los datos del body
        const { id, image, name, height, weight, life_span, temperaments } = req.body;
        // Validamos que los datos no esten vacios


        if (!image || !name || !height || !weight || !life_span || !temperaments || !Array.isArray(temperaments) || temperaments.length === 0) {
            return res.status(400).json({ msg: "Please fill in all fields." });
        }


        // creamos una nueva raza dentro de la base de datos
        const dog = await Dogs.create({ id, image, name, height, weight, life_span });
        // Buscamos los temperamentos en la base de datos
        const foundTemperaments = await Temperaments.findAll({ where: { name: temperaments } });

        // Buscamos los temperamentos que no esten en la base de datos y los creamos
        const missingTemperaments = temperaments.filter(temp => !foundTemperaments.some(foundTemp => foundTemp.name === temp));
        // For of es un metodo de array
        // recorremos los temperamentos que no estan en la base de datos
        for (const missingTemp of missingTemperaments) {
            // creamos un nuevo temperamento en la base de datos
            const newTemperament = await Temperaments.create({ name: missingTemp });
            // agregamos el nuevo temperamento al array de temperamentos encontrados
            foundTemperaments.push(newTemperament);
        }

        // agregamos los temperamentos que tiene asociado, a  la raza creada en la base de datos
        await dog.addTemperaments(foundTemperaments);
        // devolvemos la raza creada en una respuesta del servidor en formato, json, con un status 200
        return res.status(200).json(dog);

    } catch (error) {
        // si hay un error, lo devolvemos en una respuesta del servidor en formato, json, con un status 404
        return res.status(404).json({ msg: error.message });
    }
}

module.exports = postDogs;
