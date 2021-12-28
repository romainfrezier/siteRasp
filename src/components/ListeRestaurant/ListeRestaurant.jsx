import React from 'react';
import Restaurant from '../Restaurant/Restaurant';
import { supprimerRestaurant } from '../../utils/db';


const ListeRestaurant = (props) => {



    const afficherListe = () => {
        return (
             Object.keys(props.data).map((key) => (
                <Restaurant
                    nom={props.data[key].Nom}
                    adresse={props.data[key].Adresse}
                    id={key}
                    description={props.data[key].description}
                    filtres={props.data[key].Filtres}
                    setReload={props.setReload}
                    onDelete={onDelete}
                />
            ))
        );
    }


    const onDelete = (id) => {
        supprimerRestaurant(id).then((response) => {
            if (response == true){
                //actualiser le composant home
                let dataReturn = [];
                Object.keys(props.data).map((key) => (
                    (key != id ? dataReturn[key] = props.data[key] : "")
                ))
                props.setData(dataReturn)
            }
            else {
                console.log("problème rencontré lors de la suppression");
            }
        })
    }


    return (
        <React.Fragment>
            <h2>Liste Restaurant</h2>
            <div>
                {afficherListe()}
            </div>
        </React.Fragment>
    );
};

export default ListeRestaurant;