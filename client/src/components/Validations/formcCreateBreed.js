





const validationCreateBreed = (userData) => {

    let errors = {};

    if (!/^[a-zA-Z\s]+$/.test(userData.name)) {
        errors.name = 'El nombre debe contener solo letras.';
    }

    if (!/^https:\/\/.*\.(jpg|png)(\?.*)?$/.test(userData.image)) {

        errors.image = 'La imagen debe ser una URL de una imagen jpg o png.';
    }
    if (Number(userData.heightMin) >= Number(userData.heightMax)) {

        errors.heightMin = 'La altura minima no puede ser mayor a la altura maxima.';
    }

    if (Number(userData.heightMax) <= Number(userData.heightMin)) {

        errors.heightMax = 'La altura maxima no puede ser menor a la altura minima.';

    }
    if (Number(userData.weightMin) >= Number(userData.weightMax)) {

        errors.weightMin = 'El peso minimo no puede ser mayor al peso maximo.';
    }
    if (userData.weightMax <= userData.weightMin) {

        errors.weightMax = 'El peso maximo no puede ser menor al peso minimo.';
    }

    if (userData.lifeSpanMin >= userData.lifeSpanMax) {

        errors.lifeSpanMin = 'La vida minima no puede ser mayor a la vida maxima.';

    }

    if (userData.lifeSpanMax <= userData.lifeSpanMin) {

        errors.lifeSpanMax = 'La vida maxima no puede ser menor a la vida minima.';
    }

    if (userData.temperaments.length === 0) {

        errors.temperaments = 'Debe seleccionar al menos un temperamento.';

    }

    return errors;





}



export default validationCreateBreed;