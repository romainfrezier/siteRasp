import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
    height: 100%;
    color: black;
    font-size: 2rem;
    background-color: rgb(191,235,97);
    .text{
        margin: auto;
        width: 30%;
    }
`

const Footer = () => {
    return (
        <StyledFooter>
            <div className="text">
                Romain Frezier et Etienne Tillier
            </div>
        </StyledFooter>
    );
};

export default Footer;