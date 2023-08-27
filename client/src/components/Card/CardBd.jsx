import styles from './Card.module.css';
import { Link } from 'react-router-dom';

const CardBd = ({ id, image, name, temperaments, weight, unit }) => {



    return (
        <div className={styles.card}>

            <div className={styles.imageContainer}>
                <Link to={`/dogs/${id}`}>
                    <img className={styles.image} src={image} alt={name} />
                </Link>
            </div>


            <div className={styles.details}>

                <h3 className={styles.name}>{name}</h3>
                <div className={styles.temperaments}>
                    {temperaments ? <h4>Temperaments:</h4> : null}
                    <p>{temperaments?.join(', ')}</p>
                </div>
                <div className={styles.weight}>
                    <h4>Weight:</h4>
                    <p>{weight} {unit === 'metric' ? 'kg' : 'lbs'}</p>
                </div>
            </div>
        </div>
    );


}




export default CardBd;