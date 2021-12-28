import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer/Footer';
import Navbar from '../Nav/Navbar';
import { useState, useEffect } from 'react';
import { getAllStats } from '../../utils/db';
import StatsU from '../StatsU/StatsU';


const StyledStatistiques = styled.div`
    width: 100%;
    height: 100%
    `

const Statistiques = () => {

    const [statistiquesData,setStatistiquesData] = useState("");
    const [isMount, setIsMount] = useState(false);


        useEffect(() => {
            getAllStats().then((dataStats) => {
                setStatistiquesData(dataStats);
                    console.log(dataStats)
                    setIsMount(true);
                })
          }, [])

    const afficherStats = () => {
        return (
            Object.keys(statistiquesData).map((key) => (
                <StatsU
                    nom={statistiquesData[key].nom}
                    nombre={statistiquesData[key].nombre}
                    unite={statistiquesData[key].unite}
                />
            ))
        );
    }


    return (
        (isMount ? (
        <React.Fragment>
                <Navbar></Navbar>
                <StyledStatistiques>
                    {afficherStats()}
                </StyledStatistiques>
                <Footer></Footer>
        </React.Fragment>
        ) : null)
    );
};

export default Statistiques;