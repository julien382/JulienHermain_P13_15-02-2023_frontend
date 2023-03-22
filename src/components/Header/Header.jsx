import './Header.css'
import { Link } from 'react-router-dom'
import argentBankLogo from '../../assets/argentBankLogo.png'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { userLogout } from '../../services/store';
import iconProfile from '../../assets/profile.svg'

const Header = () => {
    
    const firstName = useSelector(state => state.firstName);
    const isAuthenticated = useSelector(state => state.isLogged);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(userLogout());
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
                        <div className='row'>
                            <Link to="/user"><div className='row'>
                                <img src={iconProfile} alt="Profile Icon"/>
                                <p className='firstName'>{firstName}</p>
                            </div></Link>
                            <Link onClick={handleLogout} className="main-nav-item" to="/">
                                <i className="fa fa-sign-out"></i>Sign Out
                            </Link>
                        </div>
                    ):(
                        <Link className="main-nav-item" to="/login">
                            <i className="fa fa-user-circle"></i>Sign In
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header