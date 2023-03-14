import './Header.css'
import { Link } from 'react-router-dom'
import argentBankLogo from '../../assets/argentBankLogo.png'
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../services/store";

const Header = () => {

    const isAuthenticated = isLoggedIn;
    console.log(isLoggedIn);
    
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
                    <Link className="main-nav-item" to="/login">
                        <i className="fa fa-user-circle"></i>Sign In
                    </Link>)
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header