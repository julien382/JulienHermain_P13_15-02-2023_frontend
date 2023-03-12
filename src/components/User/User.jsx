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


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function User({ userData }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  useEffect(() => {
    const fetchUserData = () => {
      fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
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
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    fetchUserData();
  }, [token]);

  return (
    <div>
        <div>
          <h1>Bienvenue sur votre page utilisateur</h1>
          <p>Email : {userData}</p>
          <p>Prénom : {userData}</p>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
        <p>Chargement en cours...</p>
    </div>
  );
}


export default User;