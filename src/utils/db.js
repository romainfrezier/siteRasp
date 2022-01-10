import  { firebase } from "./firebaseConfig";
import Geocode from "react-geocode";
const database = firebase.database();
const rootStats = firebase.database().ref("Stats")
const rootProgramme = firebase.database().ref("Programmes")



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


const supprimerProgramme = (id) => {
    return new Promise((resolve, reject) => {
        var programmeDelete = firebase.database().ref("Programmes/" + id);
        programmeDelete.remove().then(() => {
            resolve(true);
        });
    })
}







export {
    getAllProgrammes,
    getAllStats,
    creerProgramme,
    supprimerProgramme
}