

import { Link } from 'react-router-dom';
import styled from './LandingPage.module.css';

const LandingPage = () => {

    return (


        <div className={styled.landing}>

            <div>
                <h1>Bienvenido a nuestra App Dogs</h1>
                <Link to='/home' className={styled.routeH} >Entrar</Link>
            </div>
        </div>

    )

}


export default LandingPage;