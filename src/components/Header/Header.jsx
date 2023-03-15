import './Header.css'
import { Link } from 'react-router-dom'
import argentBankLogo from '../../assets/argentBankLogo.png'
import { useSelector } from 'react-redux'

const Header = () => {

    const isAuthenticated = useSelector(state => state.isLogged);

    const handleLogout = () => {
        // appeler userLogout
      };
    
    return (
        <header>
            <nav className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {isAuthenticated ? (
                        <Link className="main-nav-item" to="/">
                            <i className="fa fa-sign-out"></i>Sign Out
                        </Link>
                    ):(
                        <Link onClick={handleLogout} className="main-nav-item" to="/login">
                            <i className="fa fa-user-circle"></i>Sign In
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header