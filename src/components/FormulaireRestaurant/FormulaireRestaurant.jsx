import React , { useEffect,useState} from 'react';
import { useLocation } from "react-router-dom";
import { creerRestaurant, getAllFiltre, modifierRestaurant } from "../../utils/db"
import PlaceAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete"
import Geocode from "react-geocode";
import Navbar from '../Nav/Navbar';

const FormulaireRestaurant = (props) => {

    const [estValide,setEstValide] = useState("");
    const [filtres,setFiltres] = useState(""); 
    const [adresseSelect, setAdresseSelect] = useState("");
    const [coordonnees, setCoordonnees] = useState({
        lat : "",
        lng : ""
    })
    var filtresChoisis = [];
    const adresse = document.getElementById("adresse");
    const nom = document.getElementById("Nom");
    const description = document.getElementById("description");
    const complement = document.getElementById("complement");
    const location = useLocation();

    useEffect(() => {
        (location.state.detail.adresse != null ? setAdresseSelect(location.state.detail.adresse) : setAdresseSelect(""));
        getAllFiltre().then((filtres) => {
            setFiltres(filtres);
            console.log(" prouuuut " + location.state.detail.adresse + "filtros" + location.state.detail.filtres)
        })
      }, [])


    const onSubmit = () => {

        if (adresse.value == "") {
            setEstValide(false);
        }
        else {
            if (coordonnees.lat == "") {
                Geocode.setApiKey("AIzaSyCrGZGGBfcGzISivufJwZybIvBqEw_BQi4");
                Geocode.setLanguage("fr");
                Geocode.fromAddress(adresse.value).then(
                    (response) => {
                        console.log(response)
                        setCoordonnees(response.results[0].geometry.location)
                        setEstValide(true);
                        (location.state.detail.create ?
                            creerRestaurant(adresse.value,filtresChoisis,nom.value,description.value,complement.value,response.results[0].geometry.location)
                        : modifierRestaurant(adresse.value,filtresChoisis,nom.value,description.value,location.state.detail.id,complement.value,response.results[0].geometry.location))
                        filtresChoisis = [];
                        },
                    (error) => {
                      console.error(error);
                    }
                  );
             }
             else {
                setEstValide(true);
                (location.state.detail.create ?
                    creerRestaurant(adresse.value,filtresChoisis,nom.value,description.value,complement.value,coordonnees)
                : modifierRestaurant(adresse.value,filtresChoisis,nom.value,description.value,location.state.detail.id,complement.value,coordonnees))
                filtresChoisis = [];
             }
        }
    }

    const handleSelect = async (value) => {
        var result = await geocodeByAddress(value);
        console.log(result);
        var latlng = await getLatLng(result[0]);
        setCoordonnees(latlng);
        adresse.value = result[0].formatted_address
        setAdresseSelect(result[0].formatted_address)
    }
    
    const ajouterFiltre = (nom) => {
        if (filtresChoisis.indexOf(nom) !== -1){
            let index = filtresChoisis.indexOf(nom);
            filtresChoisis.splice(index, 1);
        }
        else {
            filtresChoisis.push(nom);
        }
    }

    const genererFiltres = () => {
        if (! location.state.detail.create){
            console.log("los filtressss = " + location.state.detail.filtres)
            filtresChoisis = location.state.detail.filtres;
        }
        console.log("filtreschoisis = " + filtresChoisis);
        return (
            Object.keys(filtres).map((key) => (
                <React.Fragment>
                    <input type="checkbox" id={filtres[key].nom}  defaultChecked={(filtresChoisis.includes(key) ? true : false)} onClick={() => ajouterFiltre(key)}/>
                    <label htmlFor={filtres[key].nom}>{filtres[key].nom}</label>
                </React.Fragment>
            ))
        )
    }


    return (
        <div>
            <Navbar></Navbar>
            <h2>Prop Restaurant</h2>
            <form>
                {estValide === false ? <p color="red">Formulaire incomplet !</p> : null}
                <label for="Nom">Nom : </label>
                <input type="text" name="Nom : " id="Nom" defaultValue={location.state.detail.nom}/>
                <div id="Adr">
                    <h3>Adresse</h3>
                    <label for="adresse">Adresse : </label>
                    <div>
                <PlaceAutocomplete
                    value={adresseSelect}
                    onChange={setAdresseSelect}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                        <div>
                            <input id="adresse" {...getInputProps({})}/>
                            <div>
                                {loading ? <div>chargement...</div> : null}

                                {suggestions.map((suggestion) => {
                                    const style = {
                                        backgroundColor : suggestion.active ? "skyBlue" : "#fff"
                                    };
                                    return (
                                        <div{...getSuggestionItemProps(suggestion, { style })}>
                                            {suggestion.description}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </PlaceAutocomplete>
                <label for="complement">Complément d'adresse : </label>
                <input type="text" name="ComplementAdr" id="complement" defaultValue={location.state.detail.complement}/>
                </div>
                </div>
                <label>Description : </label>
                <textarea name="Description" id="description" rows="5" cols="30" defaultValue={location.state.detail.description}></textarea>
                <div id="Filtres">
                    {/*Liste de "checkbox pour chaque filtre (à partir d'un autre composant ?)*/}
                </div>
                <div id="checkboxes">
                    {genererFiltres()}
                </div>
                <div className="bouton" id="saveRestaurant" onClick={() => onSubmit()}>
                    Enregistrer
                </div>
                {estValide ? (location.state.detail.create ? <p color="green">Nouveau restaurant crée !</p> : <p color="green">Restaurant modifié !</p> ) : null}
            </form>
        </div>
    );
};

export default FormulaireRestaurant;