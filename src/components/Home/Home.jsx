import React, { useEffect, useState } from 'react';
import { getAllRestaurant, getAllFiltre } from '../../utils/db';
import { useHistory } from 'react-router-dom';
import TriMap from '../TriMap/TriMap';
import Footer from '../Footer/Footer';
import { useLocation } from "react-router-dom";
import Navbar from '../Nav/Navbar';
import styled from 'styled-components';


const StyledHome = styled.div`
    height: 100vh;
    width: 100%;
    display: grid;
    grid-template-rows: 15% 75% 10%;
`


const Home = () => {

    const history = useHistory();
    const location = useLocation();
    const [restaurants, setRestaurants] = useState("");
    const [filtres, setFiltres] = useState("");
    const [isMount, setIsMount] = useState(false);
    const [reload, setReload] = useState(0);



    
    
    useEffect(() => {
        getAllRestaurant().then((dataRestaurant) => {
            setRestaurants(dataRestaurant);
            getAllFiltre().then((dataFiltre) => {
                setFiltres(dataFiltre);
                setIsMount(true);
            })
        })
      }, [reload])


      useEffect(() => { 
          console.log("test props connexion : " + localStorage.getItem("connexion"))
       }, [])
 
    return (
        (isMount ? (
            <React.Fragment>
                <StyledHome>
                    <Navbar></Navbar>
                    {/* {(sessionStorage.getItem("admin") == "true" ?
                        <React.Fragment>
                        <div className="creerRestaurant" onClick={() => goTo("FormulaireRestaurant", {create : true})}>Nouveau Restaurant</div>
                        <div className="creerFiltre"  onClick={() => goTo("FormulaireFiltre", {create : true})}>Nouveau Filtre</div>
                        </React.Fragment>
                        :
                        " "
                    )} */}
                    <TriMap
                    restaurants={restaurants}
                    filtres={filtres}
                    setRestaurants={setRestaurants}
                    setFiltres={setFiltres}
                    >
                    </TriMap>
                    <Footer></Footer>
                </StyledHome>
            </React.Fragment>
        ) : null)
    );
};

export default Home;