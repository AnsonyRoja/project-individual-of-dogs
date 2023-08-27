import { Link } from "react-router-dom";
import styles from './Card.module.css'; // Asegúrate de importar tus estilos CSS aquí

const Card = ({ id, image, name, temperaments, weight, unit, reference_image_id }) => {
    return (
        <div className={styles.card}>
            <Link to={`/dog/${reference_image_id}`} className={styles.link}>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={image} alt={name} />
                </div>
            </Link>

            <div className={styles.details}>

                <h3 className={styles.name}>{name}</h3>
                <div className={styles.temperaments}>
                    {temperaments ? <h4>Temperaments:</h4> : null}
                    <p>{temperaments}</p>
                </div>
                <div className={styles.weight}>
                    <h4>Weight:</h4>
                    <p>{weight} {unit === 'metric' ? 'kg' : 'lbs'}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;
