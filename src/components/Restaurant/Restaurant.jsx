import React from 'react';


const Restaurant = (props) => {


    return (
        <div>
            <p>Nom : {props.nom}</p>
            <p>Adresse : {props.adresse}</p>
            <p>{props.complement}</p>
            <p>{props.description}</p>
            {(sessionStorage.getItem("admin") == "true" ?
                        <React.Fragment>
                         <div className="bouton" onClick={() => props.onDelete(props.id)}>Supprimer</div>
                         <div className="bouton"  onClick={() => props.onModify()}>Modifier</div>
                         </React.Fragment>
             :
             " "
             )}
        </div>
    );
};

// export default withTheme()(withStyles(Styles)(Restaurant))

export default Restaurant;
