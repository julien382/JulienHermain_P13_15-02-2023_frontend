/*import './User.css'

const User = () => {
    return (
        <main class="main bg-dark">
            <div class="header">
                <h1>Welcome back<br />Tony Jarvis!</h1>
                <button class="edit-button">Edit Name</button>
            </div>
            <h2 class="sr-only">Accounts</h2>
            <section class="account">
                <div class="account-content-wrapper">
                    <h3 class="account-title">Argent Bank Checking (x8349)</h3>
                    <p class="account-amount">$2,082.79</p>
                    <p class="account-amount-description">Available Balance</p>
                </div>
                <div class="account-content-wrapper cta">
                    <button class="transaction-button">View transactions</button>
                </div>
            </section>
            <section class="account">
                <div class="account-content-wrapper">
                    <h3 class="account-title">Argent Bank Savings (x6712)</h3>
                    <p class="account-amount">$10,928.42</p>
                    <p class="account-amount-description">Available Balance</p>
                </div>
                <div class="account-content-wrapper cta">
                    <button class="transaction-button">View transactions</button>
                </div>
            </section>
            <section class="account">
                <div class="account-content-wrapper">
                    <h3 class="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p class="account-amount">$184.30</p>
                    <p class="account-amount-description">Current Balance</p>
                </div>
                <div class="account-content-wrapper cta">
                    <button class="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
    )
}

export default User*/

/*
//////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";

function User() {
    const [userData, setUserData] = useState({});
  
    const handleLogout = () => {
      localStorage.removeItem("token");
    };
  
    const fetchUserData = () => {
        fetch("http://localhost:3001/api/v1/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Impossible de récupérer les données de l'utilisateur");
            }
            return response.json();
          })
          .then((data) => {
            setUserData(data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
    
      useEffect(() => {
        fetchUserData();
      }, []);
  
    return (
      <div>
        <h1>Bienvenue sur votre page utilisateur</h1>
        <button onClick={handleLogout}>Se déconnecter</button>
        <p>Prénom: {userData.firstName}</p>
        <p>Nom: {userData.lastName}</p>
        <p>Email: {userData.email}</p>
      </div>
    );
}
  
  
export default User;
*/

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserdata, logout } from "../../services/action";

function User({ userData, isLoggedIn, setUserData, logout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate('/');
  };
  const token = localStorage.getItem('token');
  const fetchUserData = () => {
    fetch("http://localhost:3001/api/v1/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Impossible de récupérer les données de l'utilisateur");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Bienvenue sur votre page utilisateur</h1>
          <p>Nom : {userData.name}</p>
          <p>Email : {userData.email}</p>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  userData: state.userData,
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  setUserdata: (data) => dispatch(setUserdata(data)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);