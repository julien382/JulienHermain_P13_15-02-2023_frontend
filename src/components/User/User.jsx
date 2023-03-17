import './User.css'
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { userLogin, userUpdate } from '../../services/store';

const User = () => {
  const dispatch = useDispatch();
  const firstName = useSelector(state => state.firstName);
  const lastName = useSelector(state => state.lastName);
  const fullName = firstName !== null ? firstName + " " + lastName : '';
  const token = useSelector(state => state.token);
  const [isEdit, setIsEdit] = useState(false);

  const handleEditButton  = (e) => {
    setIsEdit(true);
  };

  const handleCancelButton  = (e) => {
    setIsEdit(false);
  };
  
  const handleNameChange  = (e) => {
    e.preventDefault();
  
    // Obtenir les données de l'input
    const { name, value } = e.target;
    // Envoyer les données au store en utilisant l'action `userUpdate`
    dispatch(userUpdate({ [name]: value }));
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
            {isEdit ? (
              <div>
                <div className="header">
                    <h1>Welcome back<br /></h1>
                </div>
                <div className='edit'>
                  <div className='editInput'>
                    <input type="text" name="firstName" onChange={handleNameChange} placeholder={firstName}/>
                    <input type="text" name="lastName" onChange={handleNameChange} placeholder={lastName}/>
                  </div>
                  <div className='editButton'>
                    <button className="edit-button" >Save</button>
                    <button className="edit-button" onClick={handleCancelButton}>Cancel</button>
                  </div>
                </div>
              </div>
              ):(
                <div>
                  <div className="header">
                      <h1>Welcome back<br />{fullName}</h1>
                  </div>
                  <button className="edit-button editName" onClick={handleEditButton}>Edit Name</button>
                </div>
              )}
            
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