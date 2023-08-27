import { GET_DETAILS_BD, CREATED_BREED, GET_DOGS, GET_NAME_DOGS, CLEAR_RACES, GET_DETAIL, GET_TEMPERAMENTS, GET_DOGTEMP } from "./actions-types";

const initialState = {
    dogs: [],
    races: [],
    temperaments: [],
    detailDog: {},
    dogTemperaments: [],
    newBreed: {},
    detailDogBd: {}
}



const reducer = (state = initialState, { type, payload }) => {


    switch (type) {

        case GET_DETAILS_BD:

            return {
                ...state,
                detailDogBd: payload
            }

        case CREATED_BREED:

            return {
                ...state,
                newBreed: payload
            }

        case GET_DOGS:
            return {
                ...state,
                dogs: payload,
            };

        case GET_DOGTEMP:
            return {
                ...state,
                dogTemperaments: payload,
            };
        case GET_NAME_DOGS:

            return {
                ...state,
                races: payload,
            }

        case CLEAR_RACES:
            return {
                ...state,
                races: [],
                detailDog: {}
            };
        case GET_DETAIL:
            return {
                ...state,
                detailDog: payload
            }
        case GET_TEMPERAMENTS:

            return {
                ...state,
                temperaments: payload
            }

        default:
            return { ...state };
    }


}


export default reducer;