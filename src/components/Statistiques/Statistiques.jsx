import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer/Footer';
import Navbar from '../Nav/Navbar';
import { useState, useEffect } from 'react';
import { getAllStats } from '../../utils/db';
import StatsU from '../StatsU/StatsU';


const StyledStatistiques = styled.div`
        height: 100vh;
        width: 100%;
        display: grid;
        grid-template-rows: 15% 75% 10%;
        background-color: gray;

        #listeStats{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-content: flex-start;
            overflow-y: scroll;
        }
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
                <StyledStatistiques>
                    <Navbar></Navbar>
                    <div id="listeStats">
                        {afficherStats()}
                    </div>
                    <Footer></Footer>
                </StyledStatistiques>
        </React.Fragment>
        ) : null)
    );
};

export default Statistiques;