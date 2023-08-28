import SearchBar from "../SearchBar/SearchBar";
import { Helmet } from "react-helmet";
import Card from "../Card/Card";
import CardBd from "../Card/CardBd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { filterDogs, sortDogs, getDogs, getTemperaments, getNameDogs } from "../../redux/actions";
import styled from "./Home.module.css"
import image from '../assets/dogDalmata.gif'
import Pagination from "../Pagination/Pagination";




const Home = ({ setSearchMessage, searchMessage }) => {


    const dispatch = useDispatch();

    //Estados globales (REDUX)
    const dogs = useSelector((state) => state.dogs);
    const temperaments = useSelector((state) => state.temperaments);
    const races = useSelector((state) => state.races);

    //Estados locales para el manejo de peso , ordenamiento y temperamentos del select

    const [unit, setUnit] = useState('metric');
    const [bander, setBander] = useState(true);
    const [selectedTemperament, setSelectedTemperament] = useState('');
    const [sortType, setSortType] = useState('');
    const [name, setName] = useState('');

    // Paginación
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    //Volver a la página de inicio/home con el scroll en la misma posición
    const [shouldRestoreState, setShouldRestoreState] = useState(true);





    const onSearch = (name) => {

        dispatch(getNameDogs(name))
            .then((res) => {
                if (res === undefined) {
                    setSearchMessage('No se encontró ninguna raza con ese nombre');
                } else {
                    setSearchMessage('');
                }
            })
            .catch((error) => {
                console.error('Error en la búsqueda:', error);
            });
    };



    const handleUnitChange = (newUnit) => {
        setUnit(newUnit);
    };


    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());

    }, [dispatch]);



    // Restaurar el estado de la página al volver a la página de inicio/home
    useEffect(() => {

        if (shouldRestoreState) {
            const savedState = JSON.parse(localStorage.getItem("homeState")) || {};

            if (savedState.scrollPosition) {
                window.scrollTo(0, savedState.scrollPosition);
            }

            if (savedState.currentPage) {
                setCurrentPage(savedState.currentPage);
            }

            setShouldRestoreState(false);
        }

        const saveState = () => {
            const newState = {
                scrollPosition: window.scrollY,
                currentPage: currentPage,
            };
            localStorage.setItem("homeState", JSON.stringify(newState));
        };

        window.addEventListener("beforeunload", saveState);
        return () => {
            saveState();

            window.removeEventListener("beforeunload", saveState);
        };
    }, [currentPage, shouldRestoreState]);

    const handleSortChange = (event) => {
        setSortType(event.target.value);
        setCurrentPage(1);

        dispatch(sortDogs(event.target.value, unit));

    };


    const uniqueTemperaments = temperaments.map(temp => temp.name.charAt(0).toUpperCase() + temp.name.slice(1));





    const generatePagination = () => {
        const totalPages = Math.ceil(sortedDogs?.length / itemsPerPage);
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };


    let sortedDogs = dogs;


    const handleSelectedTemperamentChange = (newTemperament) => {
        setSelectedTemperament(newTemperament);
        setCurrentPage(1); // Reiniciar la página al cambiar el temperamento seleccionado
        dispatch(filterDogs(newTemperament));

    };



    const currentItems = sortedDogs?.slice(indexOfFirstItem, indexOfLastItem);



    return (
        <div className={styled.firstContainer}>

            <div className={styled.containerSelects}>
                <div className={styled.firstSelect}>
                    <label>Peso por: </label>
                    <select className={styled.selectC} value={unit} onChange={(event) => handleUnitChange(event.target.value)}>
                        <option value="metric">Kg</option>
                        <option value="imperial">Lbs</option>
                    </select>
                </div>
                <Helmet>
                    <title>Razas de Perros - Encuentra la Raza Perfecta para Ti</title>
                    <meta name="description" content="Explora una variedad de razas de perros con diferentes temperamentos y características. Encuentra la raza perfecta para ti y tu familia." />
                </Helmet>

                <div className={styled.firstSelect}>
                    <label>Ordenar por: </label>
                    <select className={styled.selectC} value={sortType} onChange={handleSortChange}>
                        <option value="">Ninguno</option>
                        <option value="alphabetical">Alfabético</option>
                        <option value="weight">Peso</option>
                        <option value="Asc">Ascendente</option>
                        <option value="Desc">Descendente</option>
                    </select>
                </div>
                <div className={styled.firstSelect}>
                    <label>Filtrar por temperamento: </label>
                    <select
                        className={styled.selectC}
                        value={selectedTemperament}
                        onChange={(event) => handleSelectedTemperamentChange(event.target.value)}
                    >
                        <option value="Todos">Todos</option>
                        {uniqueTemperaments?.map((temperament, index) => (
                            <option key={index} value={temperament}>
                                {temperament}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styled.searchBar}>
                    <SearchBar setBander={setBander} setName={setName} setCurrentPage={setCurrentPage} setSearchMessage={setSearchMessage} name={name} onSearch={onSearch} />
                </div>
                <div className={styled.crear}>
                    <a href="/crear-raza"><button>Crear</button></a>
                </div>
            </div>

            <div className={styled.containerCards}>
                {bander === true && currentItems?.map((dog) => (
                    dog.id < 265 ? <Card
                        key={dog.id}
                        id={dog.id}
                        name={dog.name}
                        image={dog.image.url}
                        weight={unit === 'metric' ? dog.weight.metric : dog.weight.imperial}
                        temperaments={dog?.temperament}
                        reference_image_id={dog.reference_image_id}
                        unit={unit}

                    /> : (dog.id > 265 && selectedTemperament === '') || (dog.temperaments?.includes(selectedTemperament)) ?
                        dogs.length > 0 && <CardBd key={dog.id}
                            id={dog.id}
                            name={dog.name}
                            image={dog.image}
                            weight={unit === 'metric' ? dog.weight.metric : dog.weight.imperial}
                            temperaments={dog.temperaments}
                            unit={unit}
                        />
                        : null

                ))}

                {/* renderizamos la imagen gif del perro dalmata cuando se esta buscando una raza en especifico y si no se encuentra ninguna raza con ese nombre, se muestra un mensaje de error */}
                {

                    !searchMessage && name?.length > 0 && races.length === 0 ? <img src={image} alt="dogDalmata" className={styled.imgDogDalmata} /> : <h2 className={styled.searchMessage}>{searchMessage}</h2>

                }

                <div className={styled.container}>
                    {name.length > 0 ? races.map((race) => {

                        return (
                            race.id) < 265 ? <div className={styled.card} key={race.id}>

                            <a href={`/dog/${race.reference_image_id}`}>
                                <img className={styled.image} src={race.image?.url} alt={race.name} />
                            </a>
                            <h2 className={styled.name}>{race.name}</h2>
                            <h3 className={styled.temperament}>{race.temperament}</h3>
                            <h2 className={styled.weight}>{unit === 'metric' ? race.weight.metric : race.weight.imperial}{unit === 'metric' ? <span>Kg</span> : <span>Lbs</span>}</h2>



                        </div> : <CardBd

                            key={race.id}
                            image={race.image}
                            name={race.name}
                            temperaments={race.temperaments}
                            unit={unit}

                        />




                    }) : null}



                </div>




            </div>
            {
                races.length === 0 && name.length === 0 && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} generatePagination={generatePagination} />

            }

        </div >
    );
}

export default Home;

