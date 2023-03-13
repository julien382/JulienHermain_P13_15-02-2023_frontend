import './Header.css'
import { Link } from 'react-router-dom'
import argentBankLogo from '../../assets/argentBankLogo.png'

const Header = () => {

    const isLogin = false
    
    return (
        <header>
            <nav className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {isLogin ? (
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