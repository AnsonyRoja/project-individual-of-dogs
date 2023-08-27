import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDetailBd, clearRaces } from "../../redux/actions";
import styles from "./Detail.module.css";
import { useNavigate } from "react-router-dom";


const Details = ({ setSearchMessage }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const detailDog = useSelector((state) => state.detailDogBd);

    useEffect(() => {
        dispatch(getDetailBd(id));

        return () => {
            dispatch(clearRaces());
            setSearchMessage('');

        };
    }, [dispatch, id, setSearchMessage]);

    const breed = detailDog;

    return (
        <div className={styles.backg}>
            <div className={styles.container}>
                <Link to="#" className={styles.backLink} onClick={() => navigate(-1)} >
                    ← Regresar
                </Link>
                {breed ? (
                    <div key={breed.id} className={styles.dogDetails}>
                        <img src={detailDog?.image} alt={breed.name} className={styles.dogImage} />
                        <div className={styles.dogInfo}>
                            <h2 className={styles.breedName}>{breed.name}</h2>
                            <p className={styles.detail}>ID: {breed.id}</p>
                            <p className={styles.detail}>Height: {breed.height?.imperial} CM</p>
                            <p className={styles.detail}>Weight: {breed.weight?.metric} KG</p>
                            <p className={styles.detail}>Temperament: {breed.temperaments?.join(', ')}</p>
                            <p className={styles.detail}>Life Span: {breed.life_span}</p>
                        </div>
                    </div>
                ) : (
                    <h2 className={styles.noDetails}>No se encontraron detalles para esta raza</h2>
                )}
            </div>
        </div>
    );
};

export default Details;
