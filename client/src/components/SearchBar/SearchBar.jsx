import styles from './Search.module.css';
import { useDispatch } from 'react-redux';
import { clearRaces } from '../../redux/actions';
import { useEffect } from 'react';


export default function SearchBar({ setSelectedTemperament, name, setName, handleSelectedTemperamentChange, setBander, onSearch, setSearchMessage, setCurrentPage }) {
    const dispatch = useDispatch();

    // Estado local para el valor del input


    useEffect(() => {
        // Recuperar el valor del input almacenado en localStorage al cargar el componente
        const savedName = localStorage.getItem('searchName');
        if (savedName) {
            setName(savedName);
        }
    }, []);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setName(newValue);

        if (newValue.length === 0) {
            setSearchMessage('');
            dispatch(clearRaces());
            setCurrentPage(1);
            localStorage.removeItem("searchTerm");
            setSelectedTemperament('Todos');

        }

        if (newValue.length > 0) {
            setSearchMessage('');
            setBander(false);
        } else {
            setBander(true);
        }
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            onSearch(name);
        } else if (event.target.tagName === 'BUTTON') {
            onSearch(name);
        }
    }

    const handleClear = () => {
        setName(''); // Limpia el estado local
        handleSelectedTemperamentChange('Todos');
        setBander(true);
        dispatch(clearRaces());
        setSearchMessage('');
        setCurrentPage(1);
        localStorage.removeItem("filterStates");
    }

    // Guardar el valor del input en localStorage al cambiar el estado
    useEffect(() => {
        localStorage.setItem('searchName', name);
    }, [name]);

    return (
        <div className={styles.div}>
            <div className={styles.cont}>
                <input className={styles.input} placeholder='Nombre...' type='search' onKeyUp={handleEnter} onChange={handleChange} value={name} />
                <button onClick={handleClear}>Clean</button>
                <button className={styles.btn} onClick={handleEnter}>Buscar</button>
            </div>
        </div>
    );
}
