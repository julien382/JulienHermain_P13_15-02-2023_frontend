import './User.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { logout } from '../../services/store'

const User = () => {
  const navigate = useNavigate();
  //const token = localStorage.getItem('token');
  const [userData, setUserData] = useState(null);
  const fullName = userData && userData.body.firstName + " " + userData.body.lastName

  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout())
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
          setUserData(data);
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
        <button onClick={handleLogout}>Déconnexion</button>
        <main class="main bg-dark">
            <div class="header">
                <h1>Welcome back<br />{fullName}</h1>
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
    </div>
  );
}


export default User;