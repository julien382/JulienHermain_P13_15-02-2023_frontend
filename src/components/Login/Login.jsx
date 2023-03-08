import { useState } from 'react'
import './Login.css'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)    
    }


    const onSubmit = async (event) => {
        event.preventDefault()

        //const remember = document.getElementById("remember-me").checked;
        const payload = {email, password}
        
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    /*"Authorization":`Bearer ${token}`*/ /*a mettre ca dans l'endroit ou ca récupére (/user) */
                },
                body:JSON.stringify(payload)
            })

            if (response.ok){
                setErrorMessage('');
                const data = await response.json()
                console.log(data);
                /* mettre data.body.token dans redux  
                rediriger vers /profile */
            }
            else{
                setErrorMessage("L'email ou le mot de passe est incorrect. Veuillez réessayer.");
                console.log("Email ou Mot de passe incorrect");
            }

        }
        catch (error) {
            console.log(error);
            console.log("Email ou Mot de passe incorrect"); /* ? il sert à quoi le catch si ya deja le log erreur au dessus */
        }
    }


    return (
         <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label for="email">Email</label><input onChange={(e) => {handleEmail(e)}} type="text" id="email" />
                    </div>
                    <div className="input-wrapper">
                        <label for="password">Password</label><input onChange={(e) => {handlePassword(e)}} type="password" id="password" />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" /><label for="remember-me"
                        >Remember me</label>
                    </div>
                    <button onClick={(e) => {onSubmit(e)}} className="sign-in-button">Sign In</button>
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                </form>
            </section>
        </main>
    )
}

export default Login