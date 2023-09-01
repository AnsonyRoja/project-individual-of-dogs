import { CLEAR_DOGS, FILTER_DOGS, SORT_DOGS, GET_DETAILS_BD, CREATED_BREED, GET_DOGS, GET_NAME_DOGS, CLEAR_RACES, GET_DETAIL, GET_TEMPERAMENTS } from "./actions-types";

const initialState = {
    dogs: [],
    races: [],
    temperaments: [],
    detailDog: {},
    dogTemperaments: [],
    newBreed: {},
    detailDogBd: {},
    allDogs: [],
}



const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case CLEAR_DOGS:
            return {
                ...state,
                dogs: [],
            }

        case FILTER_DOGS:
            let filteredDogs;

            if (payload === "Todos") {
                filteredDogs = [...state.allDogs];
            } else {
                filteredDogs = state.allDogs.filter(dog =>
                    (dog.temperament && dog.temperament?.split(', ').includes(payload)) ||
                    (dog.id > 265 && dog.temperaments && dog.temperaments.includes(payload))
                );
            }

            return {
                ...state,
                dogs: filteredDogs
            };

        case SORT_DOGS:
            let copyDogs = [...state.dogs];
            const { order, unit } = payload;
            return {
                ...state,
                dogs: order === 'alphabetical' ? copyDogs.sort((a, b) => a.name.localeCompare(b.name)) : order === 'weight' ? copyDogs.sort((a, b) => {
                    const aWeight = parseFloat(unit === 'metric' ? a.weight.metric : a.weight.imperial);
                    const bWeight = parseFloat(unit === 'metric' ? b.weight.metric : b.weight.imperial);

                    return aWeight - bWeight;
                }) : order === "Asc" ? copyDogs.sort((a, b) => a.id - b.id) : order === "Desc" ? copyDogs.sort((a, b) => b.id - a.id) : state.dogs

            }


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

            const { data, data2 } = payload;
            const data3 = data2.data
            const dataCopy = [...data, ...data3]
            return {
                ...state,
                dogs: dataCopy,
                allDogs: dataCopy,
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
                detailDog: {},


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