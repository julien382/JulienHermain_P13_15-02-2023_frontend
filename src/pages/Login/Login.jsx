import { useState, useEffect } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userAuthentification } from '../../services/store'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleRememberMe = (event) => {
        setRememberMe(event.target.checked);
    }

    useEffect(() => {
        // Remember Me
        // Retrieve login information stored in local storage
        const savedLoginInfo = JSON.parse(localStorage.getItem('loginInfo')) || {};
        const savedEmail = savedLoginInfo.email || '';
        const savedPassword = savedLoginInfo.password || '';
    
        // Pre-fill the password field if login information has been stored
        if (savedEmail !== '') {
            setEmail(savedEmail);
        }
        if (savedPassword !== '') {
            setPassword(savedPassword);
            setRememberMe(true);
        }
      }, []);

    const onSubmit = async (event) => {
        event.preventDefault()
        const payload = {email, password}

        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", // retrieve data from database
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(payload)
            })


            if (response.ok){
                if(response.status === 200){
                    setErrorMessage('');
                    const data = await response.json()
                    // send data in redux                    
                    dispatch(userAuthentification(data))
                                        
                    // store login information if the "Remember me" box is checked
                    if (rememberMe) {
                        localStorage.setItem('access-token', JSON.stringify(data.body.token));
                    } else {
                        localStorage.removeItem('access-token');
                    }
                    navigate('/user');
                }
                else{
                    setErrorMessage("Une erreur c'est produite.");
                }
            }
            else{
                setErrorMessage("L'email ou le mot de passe est incorrect.");
            }

        }
        catch (error) {
            console.log(error);
            alert("Une erreur c'est produite");     
        }
    }


    return (
         <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label><input onChange={e => setEmail(e.target.value)} type="text" id="email" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label><input onChange={e => setPassword(e.target.value)} type="password" id="password" />
                    </div>
                    <div className="input-remember">
                        <label htmlFor="remember-me">Remember me</label><input type="checkbox" checked={rememberMe} onChange={handleRememberMe} id="remember-me" />
                    </div>
                    <button onClick={(e) => {onSubmit(e)}} className="sign-in-button">Sign In</button>
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                </form>
            </section>
        </main>
    )
}

export default Login