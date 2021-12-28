import React, { useState } from 'react';
import { supprimerFiltre } from '../../utils/db';
import Filtre from '../Filtre/Filtre'
import styled from 'styled-components';
import FormulaireFiltre from "../FormulaireFiltre/FormulaireFiltre"

const StyledListeFiltre = styled.div`
    background-color: yellow;
    height: calc(100% - 80px);
    width: calc(100% - 40px);
    padding: 40px 20px;
    position: relative;
    overflow-y: hidden;



    #liste {
        height: 100%;
        width: 100%;
        background-color: #fff;
        border: 0.3rem solid black;
        border-radius: 10px;
        box-shadow: 2px 3px 3px #313e30;
        position: relative;
        overflow-y: hidden;
        /* display: grid;
        grid-template-rows: 3em 1fr; */

        .creerFiltre{
            width: calc(100% - 50px);
            height: 7.5%;
            background: green;
            text-align: center;
            border-radius: 4px;
            margin: 5px 25px;
            transition: 0.2s;
            justify-self: center;
            
            
        }

        .formulaire {
            width: 100%;
            height: 22%;
            background-color: #88545d;
            position: absolute;
            border-bottom: 2px solid black;
            top: 0;
            right: 0;
            z-index: 1;

            @media (max-width : 715px){
                height: 25%;
            }

        }

        #listeFiltre {
            width: 100%;
            height: 60vh;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-content: flex-start;
            overflow-y: scroll;
            border-top: 2px solid #313e30;
            box-shadow: 0 0 2px black;
        }
    }

`

const ListeFiltre = (props) => {

    const [formulaire, setFormulaire] = useState(false);
    const [modeFormulaire, setModeFormulaire] = useState("creer");
    const [data, setData] = useState(props.data);

    const afficherListe = () => {
        return (
            Object.keys(data).map((key) => (
                <Filtre
                    nom={data[key].nom}
                    setReload={props.setReload}
                    reload={props.reload}
                    onDelete={onDelete}
                    onSelect={onSelect}
                    id={key}
                />
            ))
         );
    }

    const onDelete = (id) => {
        supprimerFiltre(id).then((response) => {
            if (response == true){
                //actualiser le composant home
                let dataReturn = [];
                Object.keys(props.data).map((key) => (
                    (key != id ? dataReturn[key] = props.data[key] : "")
                )) 
                props.setData(dataReturn)
                if (props.filtreSelectionnes.indexOf(id) !== -1){
                    let index = props.filtreSelectionnes.indexOf(id);
                    props.filtreSelectionnes.splice(index, 1);
                }
            }
            else {
                console.log("problème rencontré lors de la suppression");
                //MESSAGE ICI
            }
        })
    }

    const onSelect = (id) => {
        if (props.filtreSelectionnes.indexOf(id) !== -1){
            let index = props.filtreSelectionnes.indexOf(id);
            props.filtreSelectionnes.splice(index, 1);
        }
        else {
            props.filtreSelectionnes.push(id);
        }
        props.setFiltresSelectionnes(props.filtreSelectionnes)
        props.setUpdateFiltre(props.updateFiltre + 1)
    }


    const creerFiltreClick = (mode) => {
        setModeFormulaire(mode);
        console.log("clickcreer");
        setFormulaire(true);
    }


    return (
        <React.Fragment>
            <StyledListeFiltre>
                <div id="liste">
                     { (formulaire ? 
                    <div className="formulaire">
                        <FormulaireFiltre
                         mode={modeFormulaire}
                         setFormulaire={setFormulaire}
                         data={data}
                         setData={setData}
                         >
                        </FormulaireFiltre>
                    </div> :
                        "")
                }
                    <div className="creerFiltre"  onClick={() => {creerFiltreClick("creer")}}>Nouveau Filtre</div>
                    <div id="listeFiltre">
                        {afficherListe()}
                    </div>
                </div>
            </StyledListeFiltre>
       </React.Fragment>
    );
};

export default ListeFiltre;