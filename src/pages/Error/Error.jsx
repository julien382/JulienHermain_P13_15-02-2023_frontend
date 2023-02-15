import { Link } from 'react-router-dom'
import './Error.css'

const Error = () => {
    return (
        <div className='sectionError'>
            <h1 className='error404'>404</h1>
            <h2 className='messageError'>Oups! La page que vous demandez n'existe pas.</h2>
            <Link to="/" className='errorBackHome'>
                <p>Retourner sur la page d’accueil</p>
            
            </Link>

        </div>
    )
}

export default Error