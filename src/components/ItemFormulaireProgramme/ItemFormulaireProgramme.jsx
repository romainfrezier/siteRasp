import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';



const StyledItemFormulaireProgramme = styled.div`
    
    `

const ItemFormulaireProgramme = (props) => {

    const [typeExercice, setTypeExercice] = useState("")
    const [isChoiced, setIsChoiced] = useState(false)

    const exoSelected = (e) => {
        setIsChoiced(true)
        let value = e.target.value
        if (value == "pompes" || value == "dips" || value == "squats"){
            setTypeExercice("0 repetition")
        }
        else {
            setTypeExercice("0 seconde")
        }
    }

    const afficherSuiteForm = (bool) => {
        return (
            (bool ? 
                <React.Fragment>
                    <input required type="text" id="repet" name="repet[]" placeholder={typeExercice}/>
                    <input required type="text" id="nbSerie" name="nbSerie[]" placeholder="Nombre de séries"/>
                </React.Fragment>
                : null)
        )
    }

    return (
        <React.Fragment>
            <StyledItemFormulaireProgramme>
                    <select required name="exercice[]" id="selectexo" onChange={exoSelected}>
                        <option value="null" selected disabled>Choississez l'exercice</option>
                        <option value="pompes">Pompes</option>
                        <option value="dips">Dips</option>
                        <option value="gainage">Gainage</option>
                        <option value="chaise">Chaise</option>
                        <option value="squats">Squats</option>
                        <option value="repos">Repos</option>
                    </select>
                    {afficherSuiteForm(isChoiced)}
            </StyledItemFormulaireProgramme>
        </React.Fragment>
    );
}

export default ItemFormulaireProgramme;