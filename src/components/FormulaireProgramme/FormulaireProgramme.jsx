import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { creerProgramme } from '../../utils/db';
import Footer from '../Footer/Footer';
import ItemFormulaireProgramme from '../ItemFormulaireProgramme/ItemFormulaireProgramme';
import Navbar from '../Nav/Navbar';

const StyledFormulaireProgramme = styled.div`
    
    `



const FormulaireProgramme = (props) => {
    const [form, setForm] = useState(0)


    const ajouterExo = () => {
        setForm(form + 1)
    }

    const afficherForm = (nombre) => {
        var retour = []
        for (let i = 0; i < nombre; i++){
            retour.push(<ItemFormulaireProgramme></ItemFormulaireProgramme>)
        }
        return (
            <div>
             {retour}
            </div>
        )
    }

    const onSubmit = () => {
        var nomExercices = document.getElementsByName("exercice[]")
        var nombreRepet = document.getElementsByName("repet[]")
        var nombreSerie = document.getElementsByName("nbSerie[]")
        const programme = {
            Nom: document.getElementById("nomProgramme").value,
            Exercices: []
        }
        for (let i = 0; i < nomExercices.length; i++){
            const exercice = {
                nbSerie: nombreSerie[i].value,
                nom: nomExercices[i].value,
                repetition: nombreRepet[i].value
            }
            console.log("nbSerie = " + nombreSerie[i].value)
            console.log("nom = " + nomExercices[i].value)
            console.log("repet = " + nombreRepet[i].value)
            programme.Exercices.push(exercice)
        }
        if (nomExercices.length > 0){
            creerProgramme(programme)
        }
    }


    return (
        <React.Fragment>
            <Navbar></Navbar>
            <StyledFormulaireProgramme>
                <form id="formulaireProgramme" onSubmit={() => onSubmit()}>
                    <input type="text" id="nomProgramme" name="nomProgramme" placeholder='Nom du programme' required></input>
                    {afficherForm(form)}
                    <input type="submit"></input>
                </form>
                <div id="boutonAjoutExo" onClick={() => ajouterExo()}>Ajouter</div>
            </StyledFormulaireProgramme>
            <Footer></Footer>
        </React.Fragment>
    );
};

export default FormulaireProgramme;