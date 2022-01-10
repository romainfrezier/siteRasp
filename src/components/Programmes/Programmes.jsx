import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer/Footer';
import Navbar from '../Nav/Navbar';
import { useState, useEffect } from 'react';
import { getAllProgrammes, supprimerProgramme } from '../../utils/db';
import ProgrammeU from '../ProgrammeU/ProgrammeU';

const StyledProgrammes = styled.div`
        height: 100vh;
        width: 100%;
        display: grid;
        grid-template-rows: 15% 75% 10%;
        background-color: gray;
        #programmes {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-content: flex-start;
            overflow-y: scroll;
        }

        .programmes{
            margin: 2% 2%;
            padding: 3px;
            background-color: rgb(191,235,97);
            border: solid black 1px;
            border-radius: 3%;
            transition: 0.2s;

            :hover{
                cursor: pointer;
                transform: scale(1.1);
            }

            .titreProgramme{
                text-align: center;
            }
        }
    `



const Programmes = () => {


    const [programmesData,setProgrammesData] = useState("");
    const [isMount, setIsMount] = useState(false);


        useEffect(() => {
            getAllProgrammes().then((programmesData) => {
                    setProgrammesData(programmesData);
                    console.log(programmesData)
                    setIsMount(true);
                })
          }, [])

    const onDelete = (id) => {
        supprimerProgramme(id).then((response) => {
            if (response == true){
                //actualiser le composant home
                let dataReturn = [];
                Object.keys(programmesData).map((key) => (
                    (key != id ? dataReturn[key] = programmesData[key] : "")
                ))
                setProgrammesData(dataReturn)
            }
            else {
                console.log("problème rencontré lors de la suppression");
            }
        })
    }


    const afficherProgrammes = () => {
        return (
            Object.keys(programmesData).map((key) => (
                <React.Fragment>
                    <div className="programmes">
                        <h3 className="titreProgramme">Programme {programmesData[key].Nom}</h3>
                        <ProgrammeU
                            id={key}
                            onDelete={onDelete}
                            exercices={programmesData[key].Exercices}
                        />
                    </div>
                </React.Fragment>
            ))
        );
    }


    return (
        (isMount ?
        <React.Fragment>
            <StyledProgrammes>
                <Navbar></Navbar>
                <div id="programmes">
                    {afficherProgrammes()}
                </div>
                <Footer></Footer>
            </StyledProgrammes>
        </React.Fragment>
        : null )
    );
};

export default Programmes;