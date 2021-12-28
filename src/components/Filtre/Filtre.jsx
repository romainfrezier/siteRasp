import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import deleteIcon from '../../assets/img/delete.png'
import editIcone from '../../assets/img/edit.png'


const StyledFiltre = styled.div`
    flex-basis: content;
    margin: 10px;
    height: 1em;


    > div {

        .bouton {

            display: none;

            :nth-child(1){
                position: absolute;
                top: 0;
                right: 0;
                width: 0.75em;
                height: 0.75em;
            }

            :nth-child(2){
                position: absolute;
                top: 0;
                right: 13px;
                width: 0.75em;
                height: 0.75em;

            }
        }
        position: relative;
        background-color: ${({selected}) => selected ? "#27e421" : "#b0a09c"};
        transition: 0.3s;

    :hover{
        cursor: pointer;
        background-color: ${({selected}) => selected ? "#dc2c29" : "#27e421"};
        transform: scale(1.1);

        .bouton{
            display: block;
        }
    }
        border: 1px solid #2a4827;
        border-radius: 5px;
        text-align: center;
        width: 100%;
        height: 1.5em;
        padding: 0 5px;

        @media (max-width : 1250px){
            font-size: 0.8rem;
    }
    }
    
`

const Filtre = (props) => {
    
    const [selected, setSelected] = useState(false)
    const history = useHistory();

    const onModif = () => {
        history.push({
            pathname: './FormulaireFiltre',
            //search: '?query=abc',
            state: { detail: {create : false,
                                nom : props.nom,
                                id : props.id}
                     }
        })
    }

    const onClickFiltre = () => {
        setSelected(!selected);
        props.onSelect(props.id)
    }

    return (
        <StyledFiltre selected={selected}>
            <div id={props.id} onClick={() => onClickFiltre()}>
                {props.nom}
                <img className="bouton" src={editIcone} onClick={() => onModif()}></img>
                <img className="bouton" src={deleteIcon} onClick={() => props.onDelete(props.id)}></img>
            </div>
        </StyledFiltre>
    );
};

export default Filtre;