import React from 'react';
import styled from 'styled-components';

const StyledProgrammeU = styled.div`

        #buttonsupprimer{
            margin: auto;
            text-align: center;
            width: 50%;
            color: black;
            background-color: white;
            border: solid black 1px;
            border-radius: 10px;
            transition: 0.2s;

            :hover{
                background-color: red;
                cursor: pointer;
                color: white;
                transform: scale(1.1);
            }

        }
    `

const ProgrammeU = (props) => {


    const afficherExercice = (exercice) => {
        let chaine = ""
        chaine += exercice.nbSerie + " x " + exercice.repetition
        chaine += (exercice.nom == "gainage" || exercice.nom == "chaise" ? " secondes de " : " ")
        chaine += exercice.nom
        return chaine
    }

    const afficherProgramme = () => {
        return (
            Object.keys(props.exercices).map((key) => (
                <React.Fragment>
                    <p>{afficherExercice(props.exercices[key])}</p>
                </React.Fragment>
            ))
        )
    }

    return (
        <React.Fragment>
            <StyledProgrammeU>
                <div className='button' id="buttonsupprimer" onClick={() => {props.onDelete(props.id)}}>Supprimer</div>
                {afficherProgramme()}
            </StyledProgrammeU>
        </React.Fragment>
    );
};

export default ProgrammeU;