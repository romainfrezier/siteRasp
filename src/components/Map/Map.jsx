import { height } from '@material-ui/system';
import React, {useState, useEffect} from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import Restaurant from '../Restaurant/Restaurant';
import icone from "../../assets/img/restaurantIcone.jpg"
import { useHistory } from 'react-router-dom';
import {supprimerRestaurant } from "../../utils/db"

const Markers = (props) => {

    const history = useHistory();

    console.log("PROPPPSEE " + JSON.stringify(props));

    const [latBase, setLatBase] = useState(props.latBase);
    const [longBase, setLongBase] = useState(props.longBase);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
    const google = window.google;



    useEffect(() => { 
        navigator.geolocation.getCurrentPosition((position) => {
            setLatBase(position.coords.latitude);
            setLongBase(position.coords.longitude);
        })
     }, [])

     const onClickMarker = (restaurant,key) => {
        setSelectedRestaurant(restaurant);
        setLatBase(restaurant.lat);
        setLongBase(restaurant.lng);
        setSelectedRestaurantId(key);
     }


     const onModif = () => {
         history.push({
             pathname: './FormulaireRestaurant',
             //search: '?query=abc',
             state: { detail: {create : false,
                                nom : selectedRestaurant.Nom,
                                id : selectedRestaurantId,
                                filtres : selectedRestaurant.Filtres,
                                description : selectedRestaurant.description,
                                adresse : selectedRestaurant.Adresse,
                                complement : selectedRestaurant.complement
                                }
                      }
         })
     }

     const onDelete = (id) => {
        supprimerRestaurant(id).then((response) => {
            if (response == true){
                //actualiser le composant home
                let dataReturn = [];
                Object.keys(props.restaurants).map((key) => (
                    (key != id ? dataReturn[key] = props.restaurants[key] : "")
                ))
                props.setRestaurants(dataReturn)
                setSelectedRestaurantId(null);
                setSelectedRestaurant(null);
            }
            else {
                console.log("problème rencontré lors de la suppression");
            }
        })
    }

    // const modifMap = (mapProps,map) => {
    //     console.log("setmap " + JSON.stringify(map))
    //     // props.setCoordonnes({lat : map.latLng.lat,
    //     //     lng : map.latLng.lng})
    //     // 
    // }

    return (
      <GoogleMap 
        id="map"
        defaultZoom={props.zoom}
        center={{lat: latBase, lng: longBase}}
        // onDragEnd={modifMap}
        >
        { Object.keys(props.restaurants).map((key) => {
            return (
                <Marker
                id={key}
                position={{ lat: props.restaurants[key].lat, lng: props.restaurants[key].lng }}
                onClick={() => onClickMarker(props.restaurants[key],key)}
                icon={{
                    url: icone,
                    scaledSize: new google.maps.Size(50, 50)
                }}
                >
                </Marker>
            )
             })
         }
          {selectedRestaurant && (
                <InfoWindow
                    position={{lat: selectedRestaurant.lat, lng: selectedRestaurant.lng}}
                    onCloseClick={() => {
                        setSelectedRestaurant(null);
                    }}
                >
                        <Restaurant
                            nom={selectedRestaurant.Nom}
                            adresse={selectedRestaurant.Adresse}
                            id={selectedRestaurantId}
                            description={selectedRestaurant.description}
                            filtres={selectedRestaurant.Filtres}
                            complement={selectedRestaurant.complement}
                            onDelete={onDelete}
                            onModify={onModif}
                        />
                </InfoWindow>
                )}
      </GoogleMap>
    );
  };
  
  export default withScriptjs(withGoogleMap(Markers));
 

