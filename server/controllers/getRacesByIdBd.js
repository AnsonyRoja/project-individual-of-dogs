const { Dogs, Temperaments } = require('../src/db.js');

const getRacesByIdBd = async (req, res) => {
    try {
        const { id } = req.params;


        const dog = await Dogs.findOne({
            where: { id: id },
            include: Temperaments,
        });

        if (!dog) {
            return res.status(404).json({ message: 'No se encontró la raza con el id ingresado' });
        }

        const temperaments = dog.Temperaments.map(temp => temp.name);

        const dogWithTemperaments = {
            id: dog.id,
            name: dog.name,
            image: dog.image,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span,
            temperaments: temperaments,
        };

        res.status(200).json(dogWithTemperaments);
    } catch (error) {

        res.status(500).json({ message: 'Ocurrió un error en el servidor' });
    }
};

module.exports = getRacesByIdBd;
