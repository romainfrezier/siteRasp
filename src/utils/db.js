import  { firebase } from "./firebaseConfig";
import Geocode from "react-geocode";
const database = firebase.database();
const rootRestaurant =  firebase.database().ref("Database/Restaurant");
const rootFiltre =  firebase.database().ref("Database/Filtres");
const rootAdmin =  firebase.database().ref("Database/Admin");
const rootStats = firebase.database().ref("Database/Stats")
const rootProgramme = firebase.database().ref("Database/Programmes")
Geocode.setApiKey("AIzaSyCrGZGGBfcGzISivufJwZybIvBqEw_BQi4");
Geocode.setLanguage("fr");



const getAllStats = () => {
    return new Promise((result, reject) => {
        rootStats.once("value", (snapshot) => {
            if (snapshot.val()){
                result(snapshot.val());
            }
            else {
                console.log("no stats fetched")
            }
        })
    })
}

const getAllProgrammes = () => {
    return new Promise((result, reject) => {
        rootProgramme.once("value", (snapshot) => {
            if (snapshot.val()){
                result(snapshot.val());
            }
            else {
                console.log("no programmes fetched")
            }
        })
    })
}

const creerProgramme = (programme) => {
    var newProgramme = rootProgramme.push();
    newProgramme.set({
        "Nom" : programme.Nom,
        "Exercices" : programme.Exercices
    })
}


const getAllRestaurant = () => {
    console.log("entré");
    return new Promise((result, reject) => {
        rootRestaurant.once("value", (snapshot) => {
            if (snapshot.val()){
                result(snapshot.val());
            }
            else {
                console.log("no restaurants fetched")
            }
        })
    })
}

const getAllFiltre = () => {
    console.log("entré");
    return new Promise((result, reject) => {
        rootFiltre.once("value", (snapshot) => {
            if (snapshot.val()){
                result(snapshot.val());
            }
            else {
                console.log("no filtres fetched")
            }
        })
    })
}

const creerRestaurant = (adresse, filtres, nom, description, complement, coordonnees) => {
          var newRestaurant = rootRestaurant.push();
          newRestaurant.set({
              "Adresse" : adresse,
              "Filtres" : (filtres.length != 0  ? filtres : ["dataSave"]),
              "Nom" : nom,
              "description" : description,
              "complement" : complement,
              "lat" : coordonnees.lat,
              "lng" : coordonnees.lng
          })
        }

const creerFiltre = (nom) => {
    var newFiltre = rootFiltre.push();
    newFiltre.set({
        "nom" : nom
    })
}

const supprimerRestaurant = (id) => {
    return new Promise((resolve, reject) => {
        var restaurantDelete = firebase.database().ref("Database/Restaurant/" + id);
        restaurantDelete.remove().then(() => {
            resolve(true);
        });
    })
}

const supprimerFiltreRestaurant = (id) => {
    getAllRestaurant().then((restaurants) => {
        let newRestaurants = restaurants;
        console.log("prout " + JSON.stringify(restaurants));
        Object.keys(restaurants).map((key) => {
            if (restaurants[key].Filtres.includes(id)){
                let index = newRestaurants[key].Filtres.indexOf(id);
                newRestaurants[key].Filtres.splice(index, 1);
            }
        })
        //bd
        const newData = {
            Restaurant : newRestaurants
        }
        firebase.database().ref("Database").once("value", (snapshot) => {
            snapshot.ref.update(newData);
        })
    })
}

const supprimerFiltre = (id) => {
    return new Promise((resolve, reject) => {
        var filtreDelete = firebase.database().ref("Database/Filtres/" + id);
        filtreDelete.remove().then(() => {
            rootRestaurant.orderByChild("Filtres");
            supprimerFiltreRestaurant(id);
            resolve(true);
        });
    })
}

const existeFiltre = (nomFiltre) => {
    return new Promise((resolve, reject) => {
        getAllFiltre().then((filtres) => {
            var bool = false;
                Object.keys(filtres).map((key) => (
                    (filtres[key].nom.toUpperCase() === nomFiltre.toUpperCase() ? bool = true : null)
                ))
                resolve(bool);        
        })
    })
}

const modifierFiltre = (nomFiltre, idFiltre) => {
    return new Promise((resolve, reject) => {
        var filtreModif = firebase.database().ref("Database/Filtres/" + idFiltre);
        const newData = {
            nom : nomFiltre
        }
        filtreModif.once("value",(snapshot) => {
            snapshot.ref.update(newData);
        })
    })
}

const modifierRestaurant = (adresse, filtres, nom, description, id, complement, coordonnees) => {
    return new Promise((resolve, reject) => {
              var restaurantModif = firebase.database().ref("Database/Restaurant/" + id);
              const newData = {
                  Adresse : adresse,
                  Filtres : (filtres.length != 0 ? filtres : ["dataSave"]),
                  Nom : nom,
                  description : description,
                  complement : complement,
                  lat : coordonnees.lat,
                  lng : coordonnees.lng
              }
              restaurantModif.once("value",(snapshot) => {
                  snapshot.ref.update(newData);
                  resolve(true);
              })
        })
    }

const verifAdmin = (uid) => {
    return new Promise((result, reject) => {
        rootAdmin.once("value", (snapshot) => {
            if (snapshot.val()){
                for (let id of snapshot.val()){
                    if (id.id == uid){
                        result(true);
                    }
                }
                result(false);
            }
            else {
                console.log("no admin fetched");
                reject(false);
            }
        })
    })
}

const verifConnexion = () => {
    if (sessionStorage.getItem("connexion") == "true"){
        return true;
    }
    else { 
        return false;
    }
}





export {
    getAllRestaurant,
    getAllFiltre,
    creerRestaurant,
    creerFiltre,
    supprimerRestaurant,
    supprimerFiltre,
    supprimerFiltreRestaurant,
    existeFiltre,
    modifierFiltre,
    modifierRestaurant,
    verifAdmin,
    verifConnexion,
    getAllProgrammes,
    getAllStats,
    creerProgramme
}