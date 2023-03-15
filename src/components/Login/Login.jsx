import { useState, useEffect } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../services/store'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleRememberMe = (event) => {
        setRememberMe(event.target.checked);
        console.log(rememberMe);
    }

    useEffect(() => {
        // Récupérer les informations de connexion stockées dans le stockage local
        const savedLoginInfo = JSON.parse(localStorage.getItem('loginInfo')) || {};
        const savedEmail = savedLoginInfo.email || '';
        const savedPassword = savedLoginInfo.password || '';
    
        // Pré-remplir le champ de mot de passe si des informations de connexion ont été stockées
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
            const response = await fetch("http://localhost:3001/api/v1/user/login",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(payload)
            })

            if (response.ok){
                /*if(response !== 200){
                    localStorage.removeItem("token");
                    setErrorMessage("Une erreur c'est produite");
                }
                else{*/
                    setErrorMessage('');
                    const data = await response.json()
                    localStorage.setItem("token", data.body.token); // mettre ca en commentaire pour tester avec redux
                    dispatch(userLogin({ token: data.body.token }))

                    console.log(data);

                    /*setUserdata(data.user);*/
                    
                    // stocker les informations de connexion si la case "Se souvenir de moi" est cochée
                    if (rememberMe) {
                        localStorage.setItem('loginInfo', JSON.stringify(payload));
                    } else {
                        localStorage.removeItem('loginInfo');
                    }
                    navigate('/user');
               // }
            }
            else{
                setErrorMessage("L'email ou le mot de passe est incorrect.");
            }

        }
        catch (error) {
            console.log(error);
            console.log("Une erreur c'est produite"); 
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