import React, {useState} from 'react';
import { creerFiltre, existeFiltre, modifierFiltre, getAllFiltre } from '../../utils/db';
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import Exit from "../../assets/img/exit.png"

const StyledFormulaireFiltre = styled.div`


    form {
        text-align: center;
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        justify-items: center;


        .exit{
            height: 1em;
            position: absolute;
            background-color: red;
            transition: 0.1s;
            border: 1px solid black;
            top: 0;
            right: 0;
            
            :hover{
                transform: scale(1.25);
                right: 2px;
            }

        }

        label, p , input{
            font-size: 1.1rem;

            @media (max-width : 1000px){
                font-size: 0.9rem;
            }

            @media (max-width : 880px){
                font-size: 0.8rem;
            }
        }

        h2 {
            font-size: 1.3rem;

            
            @media (max-width : 1000px){
                font-size: 1.1rem;
            }

            @media (max-width : 880px){
                font-size: 1rem;
            }
        }

        .valider {
            background-color: green;
            width: 7em;
            margin-left: auto;
            margin-right: auto;
            border: 1px solid black;
            border-radius: 5px;
            transition: 0.3s;
            margin-top: 5px;

            :hover{
                transform: scale(1.1);
                letter-spacing: 1px;
                cursor: pointer;
            }
        }

        input{
            border: 1px solid black;
            width: 10em;
            height: 1.2em;
            transition: 0.3s;
            place-self: center;


            :focus {
                transform: scale(1.1);
                margin-left: 10px;
            }
       }
        
    }  

   
`

const FormulaireFiltre = (props) => {

    const [estValide,setEstValide] = useState("");
    const [filtreExiste, setFiltreExiste] = useState("");
    const location = useLocation();

    const onSubmit = () => {
        const nom = document.getElementById("Nom");
        if (nom.value == "") {
            setEstValide(false);
        }
        else {
            existeFiltre(nom.value).then((value) => {
                if (value) {
                    setFiltreExiste(true);
                    setEstValide("");
                }
                else {
                    setFiltreExiste(false);
                    setEstValide(true);
                    (props.mode == "creer" ? creerFiltre(nom.value) : modifierFiltre(nom.value,location.state.detail.id));
                    console.log("filtres" + JSON.stringify(props.data));
                    getAllFiltre().then((dataFiltre) => {
                        props.setData(dataFiltre);
                        props.setFormulaire(false);
                    })
                }
            })
            }
        }

        const onExit = () => {
            props.setFormulaire(false);
        }

    return (
        <StyledFormulaireFiltre>
            <form>
                <img className="exit" src={Exit} onClick={() => onExit()}/>
                <h2>{props.mode == "creer" ? "Créer un nouveau filtre" : "Modifier le filtre"}</h2>
                {estValide === false ? <p className="erreur">Formulaire incomplet !</p> : null}
                {filtreExiste ? <p className="erreur"> Filtre déjà existant.</p> : null}
                <label for="Nom">Nom du filtre : </label>
                <input type="text" name="Nom : " id="Nom" /*defaultValue={location.state.detail.nom}*/ />
                <div className="valider" onClick={() => onSubmit()}>Valider</div>
                {estValide ? (props.mode == "creer" ? <p color="green">Nouveau filtre crée !</p> :  <p color="green">Filtre modifié !</p> ) : null}
            </form>
        </StyledFormulaireFiltre>
    );
};

export default FormulaireFiltre;