import './User.css'
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../../services/store';

const User = () => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  //const fullName = userData && userData.body.firstName + " " + userData.body.lastName
  const firstName = useSelector(state => state.firstName);
  const lastName = useSelector(state => state.lastName);
  const fullName = firstName !== null ? firstName + " " + lastName : '';
  
  //console.log(token);
  //const token = localStorage.getItem('token')
  const token = useSelector(state => state.token);
  console.log(token);

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
          //setUserData(data);
          //console.log(data);
          dispatch(userLogin(data.body));

        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    fetchUserData();
  }, [dispatch, token]);


  return (
    <div>
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{fullName}</h1>
                <h1>Token:<br />{token}</h1>
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