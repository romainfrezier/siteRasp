import React, { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebase } from "../../utils/firebaseConfig";
import { useHistory } from 'react-router-dom';
import { verifAdmin } from "../../utils/db";

const Connexion = () => {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const history = useHistory();

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccess: () => false,
        },
      };

      useEffect(() => {
        //firebase.auth().signOut();
        firebase.auth().onAuthStateChanged((user) => {
          // !! ensure boolean
          setIsSignedIn(!!user);
          sessionStorage.setItem("connexion",!!user);
          console.log(user);
        });
      }, []);

      useEffect(() => {
        if (isSignedIn) {
            verifAdmin(firebase.auth().currentUser.uid).then((bool) => {
              if (bool == true){
                sessionStorage.setItem("admin",true);
              }
              else {
                sessionStorage.setItem("admin",false);
              }
              history.push({
                  pathname: './home',
                  //search: '?query=abc',
                  state: { detail: {connecte : true}
                          }
              })
            })
          }
    }, [isSignedIn]); 
    

      return (
        <div>
            <div className="login-page">
              <h1>Carte resto</h1>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
        </div>
      );
    };

export default Connexion;