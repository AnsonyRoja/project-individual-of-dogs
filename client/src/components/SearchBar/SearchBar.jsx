import styles from './Search.module.css';
import { useDispatch } from 'react-redux';
import { clearRaces } from '../../redux/actions';


export default function SearchBar({ setBander, onSearch, setName, name, setSearchMessage, setCurrentPage }) {

    const dispatch = useDispatch();





    const handleChange = (event) => {
        setName(event.target.value);
        if (event.target.value.length === 0) {
            setSearchMessage('');
            dispatch(clearRaces());
        }
        // verificamos que dentro del campo de texto haya algo escrito, si lo hay seteamos la bandera en false para que no se muestre, la cantidad de razas que tenemos en nuestro estado global, sino que solamente se muestren la que estamos buscando en nuestro searchBar
        if (event.target.value.length > 0) {
            setSearchMessage('');
            setBander(false);
        }
        else setBander(true);

    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            onSearch(name);

        } else if (event.target.tagName === 'BUTTON') {

            onSearch(name);

        }

    }


    const handleClear = () => {

        setName('');
        setBander(true);
        dispatch(clearRaces());
        setSearchMessage('');
        setCurrentPage(1);
    }



    return (
        <div className={styles.div}>
            <div className={styles.cont}>
                <input className={styles.input} placeholder='Nombre...' type='search' onKeyUp={handleEnter} onChange={handleChange} value={name} />
                <button onClick={() => { handleClear() }}>Clean</button>
                <button className={styles.btn} onClick={(e) => { handleEnter(e) }}>Buscar</button>
            </div>

        </div>
    );
}
