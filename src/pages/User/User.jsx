import './User.css'
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { userLogin, userUpdate } from '../../services/store';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxToken = useSelector(state => state.token);
  const firstName = useSelector(state => state.firstName);
  const lastName = useSelector(state => state.lastName);
  const fullName = firstName !== null ? firstName + " " + lastName : '';

  const localToken = localStorage.getItem('access-token')

  useEffect(() => {
    // si y'a aucun des deux, on redirige vers /
    if (reduxToken.length === 0 && !localToken) {
      navigate('/')
      return
    }
    
    // si un token dans redux => on l'utilise
    // sinon si un token dans localStorage, on l'utilise
    const token = reduxToken.length > 0 ? reduxToken : localToken.replace(/"/g,'')
    fetchUserData(token);
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
  
      if (response.ok && response.status === 200) {
        const data = await response.json();
        dispatch(userLogin(data.body));
      }
      else {
        navigate('/')
        throw new Error("Impossible de récupérer les données de l'utilisateur");
      }
    } catch (error) {
      navigate('/')
      console.log(error);
    }
  };

  const editUserData = async (token) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName }),
      })
  
      if (response.ok && response.status === 200) {
        const data = await response.json();
        console.log(data);
        dispatch(userLogin(data.body));
        setIsEdit(false);
      }
      else {
        throw new Error("Impossible de mettre à jour les données de l'utilisateur");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveButton  = (e) => {
    const token = reduxToken.length > 0 ? reduxToken : localToken.replace(/"/g,'')
    const payload = { firstName, lastName };
    editUserData(token, payload);
  };
  
  const handleEditButton  = (e) => {
    setIsEdit(true);
  };

  const handleCancelButton  = (e) => {
    setIsEdit(false);
  };
  
  const handleNameChange  = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
  
    // Mettre à jour le champ approprié avec la nouvelle valeur
    if (name === "firstName") {
      dispatch(userUpdate({ firstName: value, lastName }));
    } else if (name === "lastName") {
      dispatch(userUpdate({ firstName, lastName: value }));
    }
  };


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
                    <button className="edit-button" onClick={handleSaveButton}>Save</button>
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