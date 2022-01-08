import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';



const StyledItemFormulaireProgramme = styled.div`
    
    `

    const [typeExercice, setTypeExercice] = useState("")
    const [isChoiced, setIsChoiced] = useState("")


    return (
        <React.Fragment>
            <StyledItemFormulaireProgramme>
                <form>
                    <select required name="exercice" id="selectexo">
                        <option value="pompes">Pompes</option>
                        <option value="dips">Dips</option>
                        <option value="gainage">Gainage</option>
                        <option value="chaise">Chaise</option>
                        <option value="squat">Squats</option>
                    </select>
                    (isChoiced ?
                        <input required type="text" id="repet" name="repet" placeholder={typeExercice}/>
                        <input required type="text" id="nbSerie" name="nbSerie" placeholder="Nombre de séries"/>
                    : null)
                </form>
            </StyledItemFormulaireProgramme>
        </React.Fragment>
    );

export default ItemFormulaireProgramme;