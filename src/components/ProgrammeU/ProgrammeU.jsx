import React from 'react';
import styled from 'styled-components';

const StyledProgrammeU = styled.div`

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
                {afficherProgramme()}
            </StyledProgrammeU>
        </React.Fragment>
    );
};

export default ProgrammeU;