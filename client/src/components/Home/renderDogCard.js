
import Card from "../Card/Card";
import CardBd from "../Card/CardBd";

const renderDogCard = (dog, unit) => {
    // Aquí puedes poner la lógica de renderizado específica para cada tipo de raza o dato
    if (dog.id < 265) {
        return (
            <div key={dog.id}>

                <Card
                    key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    image={dog.image.url}
                    weight={unit === 'metric' ? dog.weight.metric : dog.weight.imperial}
                    temperaments={dog?.temperament}
                    reference_image_id={dog.reference_image_id}
                    unit={unit}

                />

            </div>
        );
    } else if (dog.id > 265) {
        return (
            <div key={dog.id}>

                <CardBd key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    image={dog.image}
                    weight={unit === 'metric' ? dog.weight.metric : dog.weight.imperial}
                    temperaments={dog.temperaments}
                    unit={unit}
                />

            </div>
        );
    } else {
        return null;
    }
};

export default renderDogCard;