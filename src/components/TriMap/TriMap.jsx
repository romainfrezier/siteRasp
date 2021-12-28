import React , { useState, useEffect } from 'react';
import Map from '../Map/Map';
import ListeFiltre from '../ListeFiltre/ListeFiltre';
import styled from 'styled-components';


const StyledTriMap = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 70% 30%;
    overflow: hidden;

    @media (max-width : 600px){
                display: block;

                .map{
                    height: 60%;
                    width: 100%;
                }

                .liste{
                    height: 40%;
                    width: 100%;
                }

    }
`

const TriMap = (props) => {

    const [restaurantsTri,setRestaurantsTri] = useState(props.restaurants);
    const [filtreSelectionnes,setFiltresSelectionnes] = useState([]);
    const [updateFiltre, setUpdateFiltre] = useState(0);
    const [coordonees, setCoordonees] = useState({
        lat: 2.294481,
        lng: 48.854889
    })
    const [zoom, setZoom] = useState(4);

    useEffect(() => {
        triRestaurant();
      }, [updateFiltre])



    const triRestaurant = () => {
        let liste = []
        const triUnFiltre = (id) => {
            Object.keys(props.restaurants).map((key) => {
                if (!liste.includes(props.restaurants[key])){
                    if (props.restaurants[key].Filtres.indexOf(id) !== -1){
                        liste.push(props.restaurants[key]);
                    }
                }
            })
        }
        for (let id of filtreSelectionnes){
            triUnFiltre(id)
        }
        setRestaurantsTri(liste)
    }


    return (
        <React.Fragment> 
            <StyledTriMap>
                <div className="map">
                    <Map 
                    googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCrGZGGBfcGzISivufJwZybIvBqEw_BQi4'
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    latBase={coordonees.lat}
                    longBase={coordonees.lng}
                    zoom={4}
                    restaurants={(filtreSelectionnes.length == 0 ? props.restaurants : restaurantsTri)}
                    setRestaurants={setRestaurantsTri}
                    setCoordonnes={setCoordonees}
                    />
                </div>
                <div className="liste">
                    <ListeFiltre
                    data={props.filtres}
                    setData={props.setFiltres}
                    filtreSelectionnes={filtreSelectionnes}
                    setFiltresSelectionnes={setFiltresSelectionnes}
                    updateFiltre={updateFiltre}
                    setUpdateFiltre={setUpdateFiltre}
                    />
                </div>
            </StyledTriMap>
        </React.Fragment>
    );
};

export default TriMap;