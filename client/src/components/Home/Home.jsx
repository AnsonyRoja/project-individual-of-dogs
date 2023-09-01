import SearchBar from "../SearchBar/SearchBar";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearDogs, filterDogs, sortDogs, getDogs, getTemperaments, getNameDogs } from "../../redux/actions";
import styled from "./Home.module.css"
import Pagination from "../Pagination/Pagination";
import { persistor } from '../../redux/store'
import renderDogCard from "./renderDogCard";



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
    const [searchResults, setSearchResults] = useState([]); // Estado local para almacenar resultados de búsqueda

    console.log(selectedTemperament)

    console.log(dogs)

    const onSearch = (name) => {

        dispatch(getNameDogs(name))
            .then((res) => {
                if (res === undefined) {
                    setSearchMessage('No se encontró ninguna raza con ese nombre');
                    setSearchResults([]); // Restablecer los resultados de búsqueda

                } else {
                    setSearchMessage('');
                    setShouldRestoreState(false);
                    localStorage.setItem('searchTerm', name);
                    dispatch(clearDogs());
                    setBander(false);
                    if (bander === false) {
                        setCurrentPage(1)
                    }
                }
            })
            .catch((error) => {
                return ('Error en la búsqueda:', error);
            });



    };



    const handleUnitChange = (newUnit) => {
        setUnit(newUnit);
        if (dogs.length === 0) {
            dispatch(getDogs());
        }
    };



    useEffect(() => {

        if (races.length > 0 && dogs.length > 0 && name.length > 0) {

            dispatch(clearDogs());

        } else if (dogs.length === 0 && name.length === 0) {

            dispatch(getDogs());

        }

        dispatch(getTemperaments());

        persistor.purge();

        if (name.length === 0) {
            setSelectedTemperament('');
        }

    }, [name]);



    // Restaurar el estado de la página al volver a la página de inicio/home
    useEffect(() => {

        if (shouldRestoreState && !searchResults.length) {
            const savedState = JSON.parse(localStorage.getItem("homeState")) || {};
            const savedSearchTerm = localStorage.getItem('searchTerm');

            if (savedState.scrollPosition) {
                window.scrollTo(0, savedState.scrollPosition);
            }

            if (savedState.currentPage) {
                setCurrentPage(savedState.currentPage);
            }

            if (savedState.sortType) {
                setSortType(savedState.sortType);
            }
            if (savedState.unit) {

                setUnit(savedState.unit);
            }


            if (savedState.selectedTemperament) {
                setSelectedTemperament(savedState.selectedTemperament);
            }

            if (savedSearchTerm) {
                // Realiza la búsqueda con el término almacenado
                onSearch(savedSearchTerm);
            }


            setShouldRestoreState(false);

        }

        // Guardar el estado de la página al salir de la página de inicio/home
        const saveState = () => {
            const newState = {
                scrollPosition: window.scrollY,
                currentPage: currentPage,
                sortType: sortType,
                selectedTemperament: selectedTemperament,
                unit: unit
            };
            localStorage.setItem("homeState", JSON.stringify(newState));
        };


        console.log(races)
        // Evento para guardar el estado de la página al salir de la página de inicio/home
        window.addEventListener("beforeunload", saveState);
        return () => {

            saveState();

        };
    }, [currentPage, unit, shouldRestoreState, sortType, selectedTemperament]);

    const handleSortChange = (event) => {
        setSortType(event.target.value);
        setCurrentPage(1);

        dispatch(sortDogs(event.target.value, unit));


    };



    const uniqueTemperaments = temperaments.map(temp =>
        temp.name.charAt(0).toUpperCase() + temp.name.slice(1));





    const generatePagination = () => {
        // Calculamos la cantidad de páginas que tendrá la paginación
        const totalPages = Math.ceil(sortedDogs?.length / itemsPerPage);
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };





    const handleSelectedTemperamentChange = (newTemperament) => {
        setSelectedTemperament(newTemperament);
        setCurrentPage(1); // Reiniciar la página al cambiar el temperamento seleccionado
        dispatch(filterDogs(newTemperament));
        setSortType(''); // Reiniciar el ordenamiento al cambiar el temperamento seleccionado
        localStorage.removeItem('searchTerm');


    };


    let sortedDogs;

    races.length ? sortedDogs = races : sortedDogs = dogs;

    let currentItems = sortedDogs?.slice(indexOfFirstItem, indexOfLastItem);

    if (searchMessage) currentItems.length = 0;

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
                    <SearchBar setBander={setBander} handleSelectedTemperamentChange={handleSelectedTemperamentChange} setName={setName} setCurrentPage={setCurrentPage} setSearchMessage={setSearchMessage} name={name} onSearch={onSearch} />
                </div>
                <div className={styled.crear}>
                    <a href="/crear-raza"><button>Crear</button></a>
                </div>
            </div>

            <div className={styled.containerCards}>
                {bander === true && currentItems?.map((dog) => (renderDogCard(dog, unit)))}

                {
                    searchMessage && <h2 className={styled.searchMessage}>{searchMessage}</h2>

                }

                {races?.length > 0 && currentItems.map((race) => (renderDogCard(race, unit)))}

            </div>

            {

                (bander === true || races?.length > 0) && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} generatePagination={generatePagination} />
            }


        </div >
    );
}



export default Home;