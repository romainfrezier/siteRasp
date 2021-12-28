import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer/Footer';
import Navbar from '../Nav/Navbar';
import { useState, useEffect } from 'react';
import { getAllProgrammes } from '../../utils/db';
import ProgrammeU from '../ProgrammeU/ProgrammeU';

const StyledProgrammes = styled.div`
    width: 100%;
    height: 100%
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


    const afficherProgrammes = () => {
        return (
            Object.keys(programmesData).map((key) => (
                <React.Fragment>
                    <h3>Programme {programmesData[key].Nom}</h3>
                    <ProgrammeU
                        exercices={programmesData[key].Exercices}
                    />
                </React.Fragment>
            ))
        );
    }


    return (
        (isMount ?
        <React.Fragment>
            <Navbar></Navbar>
            <StyledProgrammes>
                {afficherProgrammes()}
            </StyledProgrammes>
            <Footer></Footer>
        </React.Fragment>
        : null )
    );
};

export default Programmes;