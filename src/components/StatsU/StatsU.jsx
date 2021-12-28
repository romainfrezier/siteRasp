import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const StyledStatsU = styled.div`
    
    `
const StatsU = (props) => {


    const affichageTxt = () => {
        let chaine = props.nombre + " "
        chaine += (props.unite == "repet" ? " " : "secondes de ")
        chaine += props.nom
        return chaine
    }

    return (
        <React.Fragment>
            <StyledStatsU>
                <div className='statsu'>
                    <div>{affichageTxt()}</div>
                </div>
            </StyledStatsU>
        </React.Fragment>
    );
};

export default StatsU;