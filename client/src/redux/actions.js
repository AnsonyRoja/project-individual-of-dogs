import axios from "axios";
import { GET_DETAILS_BD, CREATED_BREED, GET_DOGS, GET_NAME_DOGS, CLEAR_RACES, GET_DETAIL, GET_TEMPERAMENTS, GET_DOGTEMP } from "./actions-types";


export const createdBreed = (sendData) => {


    const endPoint = `http://localhost:3001/thedogs/dogs`;

    return async (dispatch) => {



        const { data } = await axios.post(endPoint, sendData);

        return dispatch({
            type: CREATED_BREED,
            payload: data
        })


    }


}


export const getDogTemp = () => {

    const endPoint = `http://localhost:3001/thedogs/dogs/temperaments`

    return async (dispatch) => {

        try {

            const { data } = await axios(endPoint);

            return dispatch({
                type: GET_DOGTEMP,
                payload: data
            })

        } catch (error) {

            console.log(error.message);

        }


    }


}

export const getDogs = () => {
    const endPoint = `http://localhost:3001/thedogs/dogs`;


    return async (dispatch) => {

        try {

            const { data } = await axios(endPoint);

            if (!data.length) throw new Error("No se encontraron perros");

            return dispatch({
                type: GET_DOGS,
                payload: data
            })

        } catch (error) {

            console.log(error.message);

        }

    }

}

export const getNameDogs = (name) => {


    const endPoint = `http://localhost:3001/thedogs/dogs/name?name=${name}`;

    return async (dispatch) => {


        try {

            const { data } = await axios(endPoint);

            return dispatch({
                type: GET_NAME_DOGS,
                payload: data
            })

        } catch (error) {

            console.log(error.message);

        }


    }


}

export const clearRaces = () => {
    return {
        type: CLEAR_RACES
    };
};

export const getDetail = (id) => {

    const endPoint = `http://localhost:3001/thedogs/dogs/${id}`;

    return async (dispatch) => {

        try {

            const { data } = await axios(endPoint);

            return dispatch({
                type: GET_DETAIL,
                payload: data
            })

        } catch (error) {

            console.log(error.message);

        }

    }

}

export const getDetailBd = (id) => {


    const endPoint = `http://localhost:3001/thedogs/dogss/${id}`;

    return async (dispatch) => {

        try {

            const { data } = await axios(endPoint);

            return dispatch({
                type: GET_DETAILS_BD,
                payload: data
            })

        } catch (error) {

            console.log(error.message);

        }

    }


}

export const getTemperaments = () => {

    const endPoint = `http://localhost:3001/thedogs/temperaments`;

    return async (dispatch) => {

        try {

            const { data } = await axios(endPoint);

            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: data
            })

        } catch (error) {

            console.log(error.message);


        }

    }



}


