import './User.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

const User = () => {
  const navigate = useNavigate();
  //const token = localStorage.getItem('token');
  const [userData, setUserData] = useState(null);
  //const fullName = userData && userData.body.firstName + " " + userData.body.lastName
  const firstName = useSelector(state => state.firstName);
  const lastName = useSelector(state => state.lastName);
  const fullName = firstName + " " + lastName;


  //const token = useSelector(state => state.token);
  //console.log(token);
  const token = localStorage.getItem('token')

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
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{fullName}</h1>
                <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
    </div>
  );
}


export default User;