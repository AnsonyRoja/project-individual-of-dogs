import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRaces, getTemperaments, createdBreed } from '../../redux/actions';
import styled from './CrearRaza.module.css';
import { Link } from 'react-router-dom';
import validationCreateBreed from '../Validations/formcCreateBreed'


const CrearRaza = () => {

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [temperaments, setTemperaments] = useState([]);
    const [selectedTemperament, setSelectedTemperament] = useState('');
    const dispatch = useDispatch();
    const getemperaments = useSelector((state) => state.temperaments);
    const [userData, setUserData] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeSpanMin: '',
        lifeSpanMax: '',
        image: '',
        temperaments: [],

    });

    const areAllFieldsFilled = () => {
        const requiredFields = [
            'name',
            'heightMin',
            'heightMax',
            'weightMin',
            'weightMax',
            'lifeSpanMin',
            'lifeSpanMax',
            'image'
        ];

        const allFieldsFilled = requiredFields.every(field => {
            const value = userData[field];
            return value !== undefined && value !== '';
        });

        return allFieldsFilled && temperaments.length > 0;
    };

    const convertCmToInches = (value) => Math.round(parseInt(value) * 0.39370);
    const convertKgToPounds = (value) => Math.round(parseInt(value) * 2.20462);

    const challengeData = ({
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        lifeSpanMin,
        lifeSpanMax,
        image,
        temperaments
    }) => {
        const pulgadasMin = convertCmToInches(heightMin);
        const pulgadasMax = convertCmToInches(heightMax);
        const poundsMin = convertKgToPounds(weightMin);
        const poundsMax = convertKgToPounds(weightMax);

        return {
            name: name.trim(),
            image: image.trim(),
            height: {
                //centimetros
                metric: `${heightMin} - ${heightMax}`,
                imperial: `${pulgadasMin} - ${pulgadasMax}`
            },
            weight: {
                //kilogramos
                metric: `${weightMin} - ${weightMax}`,
                imperial: `${poundsMin} - ${poundsMax}`
            },
            life_span: `${lifeSpanMin} - ${lifeSpanMax}`,
            temperaments
        };
    };


    useEffect(() => {
        dispatch(getTemperaments());
        return () => {

            dispatch(clearRaces());
        }
    }, [dispatch]);

    const handleTemperamentChange = (event) => {
        setSelectedTemperament(event.target.value);

        setErrors(validationCreateBreed({
            ...userData,
            [event.target.name]: event.target.value
        }));


        setRegistrationSuccess(false);


    };

    const handleAddTemperament = () => {
        if (selectedTemperament && !temperaments.includes(selectedTemperament)) {
            setTemperaments([...temperaments, selectedTemperament]);
            setUserData({
                ...userData,
                temperaments: [...userData.temperaments, selectedTemperament]
            });

        }
    };

    const handleRemoveTemperament = (index) => {
        const updatedTemperaments = temperaments.filter((value, i) => i !== index);
        const updatedUserDataTemperaments = userData.temperaments.filter((value, i) => i !== index);

        setTemperaments(updatedTemperaments);
        setUserData({
            ...userData,
            temperaments: updatedUserDataTemperaments
        });
    };

    const handleChange = (event) => {

        const numericAttributes = ['heightMin', 'heightMax', 'weightMin', 'weightMax', 'lifeSpanMin', 'lifeSpanMax'];

        let newValue = event.target.value;
        if (numericAttributes.includes(event.target.name)) {
            newValue = Math.max(newValue, 0); // Asegura que el valor sea al menos 0
        }


        setUserData({
            ...userData,
            [event.target.name]: newValue,
        })

        setErrors(validationCreateBreed({
            ...userData,
            [event.target.name]: event.target.value

        }));


        setRegistrationSuccess(false);


    };

    const handleSubmit = (event) => {

        event.preventDefault();
        userData.temperaments = temperaments;
        const validationErrors = validationCreateBreed(userData);
        if (Object.keys(validationErrors).length === 0) {
            // No hay errores de validación, realizar el dispatch
            userData.temperaments = temperaments;
            const sendData = challengeData(userData);
            dispatch(createdBreed(sendData));
            setRegistrationSuccess(true); // para mostrar el mensaje de éxito
        } else {
            // Hay errores de validación, actualiza el estado de errores
            setErrors(validationErrors);
        }

        setUserData({
            name: '',
            heightMin: '',
            heightMax: '',
            weightMin: '',
            weightMax: '',
            lifeSpanMin: '',
            lifeSpanMax: '',
            image: '',
            temperaments: [],
        });
        setTemperaments([]);
        setSelectedTemperament('');

    };



    const uniqueTemperaments = getemperaments.map(temp => temp.name.charAt(0).toUpperCase() + temp.name.slice(1));

    return (
        <div className={styled.container}>
            <form className={styled.containerForm} onSubmit={handleSubmit}>
                <Link className={styled.backToHome} to='/home' >Regresar</Link>
                <h2 className={styled.title}>Crear una nueva raza</h2>
                <div className={styled.formGroup}>
                    <label className={styled.label} >Nombre:</label>
                    <input className={styled.input} type="text" name="name" value={userData.name} onChange={handleChange} />
                    {errors.name && <li className={styled.error}>{errors.name}</li>}
                </div>
                <div className={styled.formGroup}>
                    <label className={styled.label}>Imagen:</label>
                    <input className={styled.input} type="text" name="image" value={userData.image} onChange={handleChange} />
                    {errors.image && <li className={styled.error}>{errors.image}</li>}

                </div>
                <div className={styled.formGroup}>
                    <label className={styled.label}>Altura (Min - Max) - Cm:</label>
                    <input className={styled.input} type="number" name='heightMin' value={userData.heightMin} onChange={handleChange} placeholder='min' />
                    {errors.heightMin && <li className={styled.error}>{errors.heightMin}</li>}

                    <input className={styled.input} type="number" name='heightMax' value={userData.heightMax} onChange={handleChange} placeholder='max' />
                    {errors.heightMax && <li className={styled.error}>{errors.heightMax}</li>}
                </div>
                <div className={styled.formGroup}>
                    <label className={styled.label}>Peso (Min - Max) - Kg:</label>
                    <input className={styled.input} type="number" name='weightMin' value={userData.weightMin} onChange={handleChange} placeholder='min' />
                    {errors.weightMin && <li className={styled.error}>{errors.weightMin}</li>}
                    <input className={styled.input} type="number" name='weightMax' value={userData.weightMax} onChange={handleChange} placeholder='max' />
                    {errors.weightMax && <li className={styled.error}>{errors.weightMax}</li>}

                </div>
                <div className={styled.formGroup}>
                    <label className={styled.label}>Años de Vida:</label>
                    <input className={styled.input} type="number" name='lifeSpanMin' value={userData.lifeSpanMin} onChange={handleChange} placeholder='min' />
                    {errors.lifeSpanMin && <li className={styled.error}>{errors.lifeSpanMin}</li>}
                    <input className={styled.input} type="number" name='lifeSpanMax' value={userData.lifeSpanMax} onChange={handleChange} placeholder='max' />
                    {errors.lifeSpanMax && <li className={styled.error}>{errors.lifeSpanMax}</li>}

                </div>
                <div className={styled.formGroup}>
                    <label className={styled.label}>Temperamentos:</label>
                    <select className={styled.select} value={selectedTemperament} name='temperaments' style={errors.temperaments && { border: "2px solid red" }} onChange={handleTemperamentChange}>
                        <option value="">Seleccione un Temperamento</option>
                        {uniqueTemperaments.map((temperament, index) => (
                            <option key={index} value={temperament} >
                                {temperament}
                            </option>
                        ))}
                    </select>
                    <button className={styled.addButton} type="button" onClick={handleAddTemperament}>Agregar Temperamentos</button>
                    {errors.temperaments && <li className={styled.error}>{errors.temperaments}</li>}
                    <ul className={styled.temperamentList}>
                        {temperaments.map((temp, index) => (
                            <span key={index} className={styled.temperamentItem} onClick={() => handleRemoveTemperament(index)}>{temp}</span>
                        ))}
                    </ul>
                </div>
                {registrationSuccess && <p className={styled.successMessage}>Registro exitoso</p>}
                <button className={styled.submitButton} type="submit" disabled={Object.keys(errors).length > 0 || !areAllFieldsFilled()}
                >
                    Crear Raza
                </button>
            </form>
        </div>
    );
}

export default CrearRaza;
