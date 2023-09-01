import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDetail, clearRaces } from "../../redux/actions";
import styles from "./Detail.module.css";
import { useNavigate } from "react-router-dom";


const Detail = ({ setSearchMessage }) => {
    const { idRaza } = useParams();
    const dispatch = useDispatch();
    const detailDog = useSelector((state) => state.detailDog);
    const navigate = useNavigate();




    useEffect(() => {
        dispatch(getDetail(idRaza));

        return () => {
            dispatch(clearRaces());
            setSearchMessage('');

        };
    }, [dispatch, idRaza, setSearchMessage]);


    const breed = detailDog.breeds && detailDog.breeds[0];

    return (
        <div className={styles.backg}>
            <div className={styles.container}>
                <Link to="/home" className={styles.backLink} onClick={() => navigate(-1)} >
                    ← Regresar
                </Link>
                {breed ? (
                    <div key={breed.id} className={styles.dogDetails}>
                        <img src={detailDog?.url} alt={breed.name} className={styles.dogImage} />
                        <div className={styles.dogInfo}>
                            <h2 className={styles.breedName}>{breed.name}</h2>
                            <p className={styles.detail}>ID: {breed.id}</p>
                            <p className={styles.detail}>Height: {breed.height.imperial} CM</p>
                            <p className={styles.detail}>Weight: {breed.weight?.metric} KG</p>
                            <p className={styles.detail}>Temperament: {breed.temperament}</p>
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

export default Detail;
